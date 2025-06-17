'use server';

import { createClient } from '@/utils/supabase/server';

const getRangeUTC = (start, end) => {
    return {
        start: new Date(Date.UTC(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0)).toISOString(),
        end: new Date(Date.UTC(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59)).toISOString(),
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

export async function getTotalCompletitonsInLast10Weeks() {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const response = [];

    // Obtener IDs de hábitos del usuario
    const { data: habits, error: habitsError } = await supabase
        .from('habit')
        .select('id')
        .eq('userID', user.id);

    if (habitsError || !habits || habits.length === 0) {
        console.error('Error al obtener los hábitos:', habitsError);
        return [];
    }

    const habitIDs = habits.map(h => h.id);

    for (let i = 0; i < 10; i++) {
        const end = new Date();
        end.setDate(end.getDate() - i * 7);
        const start = new Date(end);
        start.setDate(end.getDate() - 6); // semana de 7 días

        const { start: startUTC, end: endUTC } = getRangeUTC(start, end);

        const { count, error: countError } = await supabase
            .from('habit_records')
            .select('*', { count: 'exact', head: true })
            .in('habitID', habitIDs)
            .gte('created_at', startUTC)
            .lte('created_at', endUTC);

        if (countError) {
            console.error(`Error al contar completaciones en la semana ${i}:`, countError);
            response.push({ week: i, count: 0 });
            continue;
        }

        response.push({ week: i, count: count ?? 0 });
    }
    console.log(response);
    return response;
}

export async function getTopWordsFromEntries(limit = 3) {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("Usuario no autenticado");

    const { data: entries, error: entryError } = await supabase
        .from("user_diaries")
        .select("content")
        .eq("userID", user.id);

    if (entryError || !entries || entries.length === 0) {
        console.error("Error al obtener entradas:", entryError);
        return [];
    }

    const conteo = {};

    for (const entry of entries) {
        const palabras = (entry.content || '')
            .toLowerCase()
            .replace(/[.,!?¿¡;:"(){}[\]]/g, '') // quitar puntuación
            .split(/\s+/); // dividir por espacios

        for (const palabra of palabras) {
            if (
                palabra &&
                palabra.length < 30 &&
                /^[a-záéíóúñü']+$/i.test(palabra) // solo palabras alfabéticas
            ) {
                conteo[palabra] = (conteo[palabra] || 0) + 1;
            }
        }
    }

    const top = Object.entries(conteo)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([palabra, frecuencia]) => ({ palabra, frecuencia }));

    return top;
}

export async function getTimesOfCompletitions() {
    const supabase = await createClient();
    const user = await getCurrentUser();


    const { data: habits, error: habitsError } = await supabase
        .from('habit')
        .select('id')
        .eq('userID', user.id);

    if (habitsError || !habits || habits.length === 0) {
        console.error('Error al obtener los hábitos:', habitsError);
        return [];
    }

    const habitIDs = habits.map(h => h.id);

    const { data: completions, error: completionsError } = await supabase
        .from('habit_records')
        .select('created_at')
        .in('habitID', habitIDs);

    if (completionsError) {
        console.error('Error al obtener las completaciones:', completionsError);
        return [];
    }

    //Number of completions per hour
    const times = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0, 21: 0, 22: 0, 23: 0 };
    completions.forEach(completion => {
        const date = new Date(completion.created_at);
        const hour = date.getHours();
        times[hour] = (times[hour] || 0) + 1;
    });

    return times;
}

export async function getTotalChallengesCompletitonsInLast10Weeks() {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const response = [];

    for (let i = 0; i < 10; i++) {
        const end = new Date();
        end.setDate(end.getDate() - i * 7);
        const start = new Date(end);
        start.setDate(end.getDate() - 6); // semana de 7 días

        const { start: startUTC, end: endUTC } = getRangeUTC(start, end);

        const { count, error: countError } = await supabase
            .from('user_challenges')
            .select('*', { count: 'exact', head: true })
            .eq('userID', user.id)
            .eq('status', true)
            .gte('created_at', startUTC)
            .lte('created_at', endUTC);

        if (countError) {
            console.error(`Error al contar completaciones en la semana ${i}:`, countError);
            response.push({ week: i, count: 0 });
            continue;
        }

        response.push({ week: i, count: count ?? 0 });
    }
    console.log(response);
    return response;
}