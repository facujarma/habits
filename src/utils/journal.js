'use server';

import { createClient } from '@/utils/supabase/server';

// 🕒 Devuelve el rango UTC del día actual: [00:00:00, 23:59:59]
function getUTCRangeForToday() {
    const now = new Date();

    const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
    const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59));

    return {
        start: start.toISOString(),
        end: end.toISOString(),
    };
}

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

// 📘 Obtener historial del diario del usuario
export async function getUserJournalHistory() {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const { data, error } = await supabase
        .from('user_diaries')
        .select('id, created_at')
        .eq('userID', user.id)
        .order('created_at', { ascending: false });

    if (error) throw new Error('No se pudo obtener el historial del diario');
    return data;
}

// 💾 Guardar entrada del diario para hoy (upsert)
export async function saveJournalEntry(entry, entryID) {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const nowUTC = new Date().toISOString();
    if (!entryID) {

        const { error } = await supabase
            .from('user_diaries')
            .insert(
                {
                    userID: user.id,
                    content: entry,
                    created_at: nowUTC,
                }
            );

        if (error) throw new Error('No se pudo guardar el diario');
    }
    else {
        const { error } = await supabase
            .from('user_diaries')
            .update({ content: entry, updated_at: nowUTC })
            .eq('id', entryID);

        if (error) throw new Error('No se pudo guardar el diario');
    }
}

// 📗 Obtener entrada del diario de hoy
export async function getTodayEntry() {
    const supabase = await createClient();
    const user = await getCurrentUser();
    const { start, end } = getUTCRangeForToday();

    const { data, error } = await supabase
        .from('user_diaries')
        .select('content')
        .eq('userID', user.id)
        .gte('created_at', start)
        .lte('created_at', end)
        .maybeSingle();

    if (error) throw new Error('No se pudo obtener el diario de hoy');
    return data?.content ?? null;
}


export async function getEntryContent(entryID) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('user_diaries')
        .select('content')
        .eq('id', entryID)
        .maybeSingle();
    if (error) throw new Error('No se pudo obtener el diario de hoy');
    return data?.content ?? null;
}