'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import {
    formatDateToLocalYYYYMMDD,
    getUTCDateString,
    getUTCRangeForToday,
    getUTCofNow
} from './TimesToBack';

const WEEKDAY_INITIALS = { Su: false, M: false, Tu: false, W: false, Th: false, F: false, Sa: false };
const WEEKDAY_MAP = { 0: 'Su', 1: 'M', 2: 'Tu', 3: 'W', 4: 'Th', 5: 'F', 6: 'Sa' };
const weekdayMap = { Su: 0, M: 1, Tu: 2, W: 3, Th: 4, F: 5, Sa: 6 };

export async function addHabit(habit) {
    const supabase = await createClient();
    // --- auth
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('Usuario no autenticado');

    // --- insertar hábito
    const { weekdays, ...habitData } = habit;
    const { data: insertedHabit, error: insertError } = await supabase
        .from('habit')
        .insert([{ userID: user.id, ...habitData }])
        .select()
        .single();
    if (insertError) throw new Error('No se pudo crear el hábito');

    // --- insertar schedules
    const activeDays = Object.entries(weekdays)
        .filter(([, isActive]) => isActive)
        .map(([key]) => weekdayMap[key]);
    if (activeDays.length) {
        const scheduleInserts = activeDays.map(wd => ({ habitID: insertedHabit.id, weekday: wd }));
        const { error: schedError } = await supabase.from('habit_schedules').insert(scheduleInserts);
        if (schedError) throw new Error('No se pudieron asignar los días al hábito');
    }

    revalidatePath('/habits');
    return insertedHabit;
}

export async function selectHabits() {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('Usuario no autenticado');
    const { data, error } = await supabase.from('habit').select('*').eq('userID', user.id);
    if (error) throw new Error('No se pudieron obtener los hábitos');
    return data;
}

export async function getHabitStatus(habitID) {
    const supabase = await createClient();
    const { start, end } = getUTCRangeForToday();
    const { data, error } = await supabase
        .from('habit_records')
        .select('status')
        .eq('habitID', habitID)
        .gte('created_at', start)
        .lte('created_at', end)
        .maybeSingle();
    if (error) throw new Error('No se pudo obtener el estado del hábito');
    return data?.status ?? null;
}

export async function markHabitAsComplete(habitID) {
    const supabase = await createClient();
    const { start, end } = getUTCRangeForToday();

    // 1) Verificar si ya hay registro hoy
    const { data: existing, error: fetchError } = await supabase
        .from('habit_records')
        .select('*')
        .eq('habitID', habitID)
        .gte('created_at', start)
        .lte('created_at', end)
        .maybeSingle();
    if (fetchError && fetchError.code !== 'PGRST116') throw new Error('Error al verificar estado');

    if (existing) {
        // 2) actualizar
        const { error: upd } = await supabase
            .from('habit_records')
            .update({ status: true })
            .eq('id', existing.id);
        if (upd) throw new Error('No se pudo actualizar el estado');
    } else {
        // 3) crear nuevo registro con record_date explícito
        const now = getUTCofNow();
        const { error: ins } = await supabase
            .from('habit_records')
            .insert({ habitID, status: true, record_date: now });
        if (ins) throw new Error('No se pudo crear el registro');
    }

    return true;
}

export async function markHabitAsIncomplete(habitID) {
    const supabase = await createClient();
    const { start, end } = getUTCRangeForToday();

    const { data: existing, error: fetchError } = await supabase
        .from('habit_records')
        .select('*')
        .eq('habitID', habitID)
        .gte('created_at', start)
        .lte('created_at', end)
        .maybeSingle();
    if (fetchError && fetchError.code !== 'PGRST116') throw new Error('Error al verificar estado');

    if (existing) {
        const { error: upd } = await supabase
            .from('habit_records')
            .update({ status: false })
            .eq('id', existing.id);
        if (upd) throw new Error('No se pudo actualizar el estado');
    } else {
        const now = getUTCofNow();
        const { error: ins } = await supabase
            .from('habit_records')
            .insert({ habitID, status: false, record_date: now });
        if (ins) throw new Error('No se pudo crear el registro');
    }

    return true;
}

export async function selectHabitsForToday() {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('Usuario no autenticado');

    // jsDay igual sin cambio
    const jsDay = new Date().getDay();
    const { data, error } = await supabase
        .from('habit')
        .select('*, habit_schedules!inner(weekday)')
        .eq('userID', user.id)
        .eq('habit_schedules.weekday', jsDay);
    if (error) throw new Error('No se pudieron obtener los hábitos de hoy');
    return data;
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
        .select("created_at")
        .eq("habitID", habitID);
    if (recError) throw new Error("No se pudieron obtener los registros");

    const scheduledWeekdays = schedules.map((s) => s.weekday);
    const scheduledDays = { ...WEEKDAY_INITIALS };
    scheduledWeekdays.forEach((wd) => {
        const key = WEEKDAY_MAP[wd];
        if (key) scheduledDays[key] = true;
    });

    const completedDates = records.map((r) => formatDateToLocalYYYYMMDD(r.created_at));
    
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
