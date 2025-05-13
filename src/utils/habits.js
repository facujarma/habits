'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

const weekdayMap = {
    D: 0, // Domingo
    L: 1, // Lunes
    M: 2, // Martes
    X: 3, // Miércoles
    J: 4, // Jueves
    V: 5, // Viernes
    S: 6, // Sábado
};

export async function addHabit(habit) {
    const supabase = await createClient();

    // 1. Obtener el usuario
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error('No hay usuario autenticado:', userError);
        throw new Error('Usuario no autenticado');
    }

    // 2. Insertar el hábito
    const { data: insertedHabit, error: insertError } = await supabase
        .from('habit')
        .insert([
            {
                userID: user.id,
                name: habit.name,
                when: habit.when,
                personToBe: habit.personToBe,
                times: habit.times,
            },
        ])
        .select()
        .single();

    if (insertError) {
        console.error('Error al insertar hábito:', insertError);
        throw new Error('No se pudo crear el hábito');
    }

    // 3. Convertir weekdays {L, M, ...} a array de números [1, 2, ...]
    const activeDays = Object.entries(habit.weekdays)
        .filter(([, isActive]) => isActive)
        .map(([dayInitial]) => weekdayMap[dayInitial]);

    // 4. Insertar en habit_schedules
    if (activeDays.length > 0) {
        const scheduleInserts = activeDays.map((weekday) => ({
            habitID: insertedHabit.id,
            weekday,
        }));

        const { error: scheduleError } = await supabase
            .from('habit_schedules')
            .insert(scheduleInserts);

        if (scheduleError) {
            console.error('Error al insertar días del hábito:', scheduleError);
            throw new Error('No se pudieron asignar los días al hábito');
        }
    }
    console.log(insertedHabit);
    revalidatePath('/home');

    return insertedHabit;
}


export async function selectHabits() {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error('No hay usuario autenticado:', userError);
        throw new Error('Usuario no autenticado');
    }

    const { data: habits, error } = await supabase.from('habit').select('*').eq('userID', user.id);
    if (error) {
        console.error('Error al obtener hábitos:', error);
        throw new Error('No se pudieron obtener los hábitos');
    }
    console.log(habits);
    return habits;
}