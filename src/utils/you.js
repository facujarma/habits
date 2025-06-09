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
