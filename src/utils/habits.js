'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

const weekdayMap = {
    Su: 0, M: 1, Tu: 2, W: 3, Th: 4, F: 5, Sa: 6,
};

// Genera fecha local YYYY-MM-DD
function getLocalDateString() {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
}

export async function addHabit(habit) {
    const supabase = await createClient();

    // 1) Obtener usuario autenticado
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
        console.error('No hay usuario autenticado:', userError);
        throw new Error('Usuario no autenticado');
    }

    // 2) Separar weekdays del resto
    const { weekdays, ...habitData } = habit;
    // 3) Insertar en tabla "habit" solo los campos válidos
    const { data: insertedHabit, error: insertError } = await supabase
        .from('habit')
        .insert([{ userID: user.id, ...habitData }])
        .select()
        .single();
    if (insertError) {
        console.error('Error al insertar hábito:', insertError);
        throw new Error('No se pudo crear el hábito');
    }

    // 4) Insertar días activos en "habit_schedules"
    const activeDays = Object.entries(weekdays)
        .filter(([, isActive]) => isActive)
        .map(([dayInitial]) => weekdayMap[dayInitial]);

    if (activeDays.length > 0) {
        const scheduleInserts = activeDays.map((weekday) => ({
            habitID: insertedHabit.id,
            weekday,
        }));
        const { error: scheduleError } = await supabase
            .from('habit_schedules')
            .insert(scheduleInserts);
        if (scheduleError) {
            console.error('Error al insertar schedules:', scheduleError);
            throw new Error('No se pudieron asignar los días al hábito');
        }
    }

    // 5) Si tienes tabla para "times", podrías insertarlos aquí de forma similar

    // 6) Revalidar la cache de la página de hábitos
    revalidatePath('/habits');

    return insertedHabit;
}

export async function selectHabits() {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('Usuario no autenticado');

    const { data: habits, error } = await supabase.from('habit').select('*').eq('userID', user.id);
    if (error) throw new Error('No se pudieron obtener los hábitos');
    return habits;
}

export async function getHabitStatus(habitID) {
    const supabase = await createClient();
    const today = getLocalDateString();

    const { data, error } = await supabase
        .from("habit_records")
        .select("status")
        .eq("habitID", habitID)
        .eq("record_date", today)
        .maybeSingle();

    if (error) throw new Error("No se pudo obtener el estado del hábito");
    return data?.status ?? null;
}

export async function markHabitAsComplete(habitID) {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("Usuario no autenticado");

    const today = getLocalDateString();

    const { error } = await supabase.from("habit_records").upsert(
        [{ habitID, record_date: today, status: true }],
        { onConflict: "habitID,record_date" }
    );

    if (error) throw new Error("No se pudo marcar como completado");
    return true;
}

export async function markHabitAsIncomplete(habitID) {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("Usuario no autenticado");

    const today = getLocalDateString();

    const { error } = await supabase.from("habit_records").upsert(
        [{ habitID, record_date: today, status: false }],
        { onConflict: "habitID,record_date" }
    );

    if (error) throw new Error("No se pudo marcar como incompleto");
    return true;
}

export async function selectHabitsForToday() {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("Usuario no autenticado");

    const jsDay = new Date().getDay();

    const { data: habits, error } = await supabase
        .from("habit")
        .select("*, habit_schedules!inner(weekday)")
        .eq("userID", user.id)
        .eq("habit_schedules.weekday", jsDay);

    if (error) throw new Error("No se pudieron obtener los hábitos de hoy");
    return habits;
}

export async function selectHabitsNotForToday() {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("Usuario no autenticado");

    const jsDay = new Date().getDay();

    const { data: habits, error } = await supabase
        .from("habit")
        .select("*, habit_schedules!inner(weekday)")
        .eq("userID", user.id)
        .neq("habit_schedules.weekday", jsDay);

    if (error) throw new Error("No se pudieron obtener los hábitos");
    return habits;
}

export async function deleteHabit(habitID) {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("Usuario no autenticado");

    const { error } = await supabase.from("habit").delete().eq("id", habitID);
    if (error) throw new Error("No se pudo eliminar el hábito");
}

export async function getHabitFullData(habitID) {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("Usuario no autenticado");

    const { data: habit, error: habitError } = await supabase
        .from("habit")
        .select("*")
        .eq("userID", user.id)
        .eq("id", habitID)
        .maybeSingle();
    if (habitError || !habit) throw new Error("No se pudo obtener el hábito");

    const { data: schedules, error: schedError } = await supabase
        .from("habit_schedules")
        .select("weekday")
        .eq("habitID", habitID);
    if (schedError) throw new Error("No se pudieron obtener los schedules");

    const { data: records, error: recError } = await supabase
        .from("habit_records")
        .select("record_date")
        .eq("habitID", habitID);
    if (recError) throw new Error("No se pudieron obtener los registros");

    const scheduledWeekdays = schedules.map((s) => s.weekday);
    const scheduledDays = { ...WEEKDAY_INITIALS };
    scheduledWeekdays.forEach((wd) => {
        const key = WEEKDAY_MAP[wd];
        if (key) scheduledDays[key] = true;
    });

    const completedDates = records.map((r) =>
        typeof r.record_date === "string"
            ? r.record_date
            : new Date(r.record_date).toISOString().split("T")[0]
    );

    return {
        ...habit,
        scheduledWeekdays,
        scheduledDays,
        completedDates,
        totalCompletions: completedDates.length,
    };
}

export async function editHabit(habitID, data) {
    const supabase = await createClient();
    const { error } = await supabase.from("habit").update(data).eq("id", habitID);
    if (error) throw new Error("No se pudo editar el hábito");
}
