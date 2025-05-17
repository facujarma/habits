'use server';

import { createClient } from '@/utils/supabase/server';


export async function addAPuff() {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error('No hay usuario autenticado:', userError);
        throw new Error('Usuario no autenticado');
    }


    const today = new Date().toISOString().split('T')[0];

    // Obtener el contador actual (o 0 si no hay registro)
    const { data: existing, error: fetchError } = await supabase
        .from('vape_counter')
        .select('counter')
        .eq('userID', user.id)
        .eq('date', today)
        .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error al obtener contador actual:', fetchError);
        throw new Error('No se pudo obtener el contador');
    }

    const newCount = (existing?.counter || 0) + 1;

    const { error: upsertError } = await supabase
        .from('vape_counter')
        .upsert(
            [
                {
                    userID: user.id,
                    date: today,
                    counter: newCount,
                },
            ],
            { onConflict: 'userID,date' }
        );
    console.log('upsertError', upsertError);
    if (upsertError) {
        console.error('Error al guardar puff:', upsertError);
        throw new Error('No se pudo guardar el puff');
    }

    return newCount;
}


export async function getVapeCounterForToday() {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error('No hay usuario autenticado:', userError);
        throw new Error('Usuario no autenticado');
    }

    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('vape_counter')
        .select('counter')
        .eq('userID', user.id)
        .eq('date', today)
        .maybeSingle();

    if (error) {
        console.error('Error al obtener el contador de vapes:', error);
        throw new Error('No se pudo obtener el contador de vapes');
    }

    return data?.counter ?? 0;
}