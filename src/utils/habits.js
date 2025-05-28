'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const weekdayMap = {
    Su: 0, M: 1, Tu: 2, W: 3, Th: 4, F: 5, Sa: 6,
};

const WEEKDAY_MAP = {
    1: "M", 2: "Tu", 3: "W", 4: "Th", 5: "F", 6: "Sa", 7: "Su"
};
const WEEKDAY_INITIALS = { M: 0, Tu: 0, W: 0, Th: 0, F: 0, Sa: 0, Su: 0 };

// ✅ Fecha local (formato YYYY-MM-DD)
function getLocalDateString() {
    const localDate = new Date();
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
    return localDate.toISOString().split("T")[0];
}

export async function addHabit(habit) {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('Usuario no autenticado');

    const { data: insertedHabit, error: insertError } = await supabase
        .from('habit')
        .insert([{ userID: user.id, ...habit }])
        .select()
        .single();
    if (insertError) throw new Error('No se pudo crear el hábito');

    const activeDays = Object.entries(habit.weekdays)
        .filter(([, isActive]) => isActive)
        .map(([dayInitial]) => weekdayMap[dayInitial]);

    if (activeDays.length > 0) {
        const scheduleInserts = activeDays.map((weekday) => ({ habitID: insertedHabit.id, weekday }));
        const { error: scheduleError } = await supabase.from('habit_schedules').insert(scheduleInserts);
        if (scheduleError) throw new Error('No se pudieron asignar los días al hábito');
    }

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
