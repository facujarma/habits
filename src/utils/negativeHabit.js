'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
export async function addNegativeHabit(negativeHabit) {
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
        .from('negative_habit')
        .insert([
            {
                userID: user.id,
                bad_habit: negativeHabit.badHabit,
                good_habit: negativeHabit.goodHabit,
                color: negativeHabit.color
            },
        ])
        .select()
        .single();

    if (insertError) {
        console.error('Error al insertar hábito:', insertError);
        throw new Error('No se pudo crear el hábito');
    }
}

export async function getNegativeHabits() {

    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error('No hay usuario autenticado:', userError);
        throw new Error('Usuario no autenticado');
    }

    const { data: habits, error } = await supabase.from('negative_habit').select('*').eq('userID', user.id);
    if (error) {
        console.error('Error al obtener hábitos negativos:', error);
        throw new Error('No se pudieron obtener los hábitos');
    }
    console.log(habits);
    return habits;

}