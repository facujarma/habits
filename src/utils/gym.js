'use server';

import { createClient } from '@/utils/supabase/server';

async function getCurrentUser() {
    const supabase = await createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        console.error('No hay usuario autenticado:', error);
        throw new Error('Usuario no autenticado');
    }

    return user;
}

export async function getUserExercices() {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const { data: exercices, error } = await supabase.from('gym_exercices').select('*').eq('userID', user.id);
    if (error) throw new Error('No se pudieron obtener los ejercicios');
    return exercices;
}

export async function createExercice(exercice) {
    const supabase = await createClient();
    const user = await getCurrentUser();
    const { data, error } = await supabase.from('gym_exercices').insert([{ ...exercice, userID: user.id }]);

    console.log(error)
    if (error) throw new Error('No se pudo crear el ejercicios');
    return data;
}