'use server';

import { createClient } from '@/utils/supabase/server';

function getLocalDateString() {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
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


export async function getUserJournalHistory() {
    const supabase = await createClient();
    const user = await getCurrentUser();
    const { data, error } = await supabase.from('user_diaries').select('created_at').eq('user_id', user.id).order('created_at', { ascending: false });
    if (error) throw new Error('No se pudieron obtener el historial del diario');
    return data;
}

export async function saveJournalEntry(entry) {
    const supabase = await createClient();

    const user = await getCurrentUser();
    const today = getLocalDateString();
    const { error } = await supabase.from('user_diaries').upsert({ userID: user.id, content: entry, created_at: today }, { onConflict: 'userID,created_at' });
    if (error) throw new Error('No se pudo guardar el diario');
}

export async function getTodayEntry() {
    const supabase = await createClient();
    const user = await getCurrentUser();
    const today = getLocalDateString();
    const { data, error } = await supabase.from('user_diaries').select('content').eq('userID', user.id).eq('created_at', today).maybeSingle();
    console.log(data, error);

    if (error) throw new Error('No se pudo obtener el diario de hoy');
    return data?.content ?? null;
}