'use server';

import { createClient } from '@/utils/supabase/server';

const streakAchievements = [
    {
        name: "Just Started 🔁",
        description: "2-day streak! Keep it up!",
        condition: (streak) => streak >= 2,
    },
    {
        name: "On a Roll 🌀",
        description: "5 days in a row. Impressive!",
        condition: (streak) => streak >= 5,
    },
    {
        name: "One Week Wonder 🧙",
        description: "7-day streak. You're a legend!",
        condition: (streak) => streak >= 7,
    },
    {
        name: "Unstoppable Train 🚂",
        description: "15 consecutive days. Whoa!",
        condition: (streak) => streak >= 15,
    },
    {
        name: "Master of Habits 🧘‍♂️",
        description: "30-day streak. You’ve ascended.",
        condition: (streak) => streak >= 30,
    }
];


const achievements = [
    {
        name: "First Step 👣",
        description: "You completed your very first habit!",
        condition: (completitions) => completitions >= 1,
    },
    {
        name: "Getting Warm 🔥",
        description: "5 habits completed. You're heating up!",
        condition: (completitions) => completitions >= 5,
    },
    {
        name: "Routine Machine 🤖",
        description: "Completed 10 habits. Are you even human?",
        condition: (completitions) => completitions >= 10,
    },
    {
        name: "Streak Freak ⚡",
        description: "25 completions? You’re on fire!",
        condition: (completitions) => completitions >= 25,
    },
    {
        name: "Habit Hero 🦸‍♂️",
        description: "50 completed habits. You’re unstoppable.",
        condition: (completitions) => completitions >= 50,
    },
    {
        name: "Century Club 💯",
        description: "100 completions! This is legendary stuff.",
        condition: (completitions) => completitions >= 100,
    },
    {
        name: "Obsessed Much? 😅",
        description: "150 completions. Maybe take a break?",
        condition: (completitions) => completitions >= 150,
    },
    {
        name: "The Habit King 👑",
        description: "200+ completions. You rule this realm.",
        condition: (completitions) => completitions >= 200,
    }
];

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

export async function getTotalCompletitonsOfUser() {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const { data: { total_completitions }, error } = await supabase
        .from('user_stats')
        .select('total_completitions')
        .eq('userID', user.id)
        .single();

    if (error || !total_completitions) throw new Error('No se pudieron obtener las estadísticas del usuario');

    return total_completitions ? total_completitions : 0;
}

export async function checkCompletitionsAchivements() {

    const completitions = await getTotalCompletitonsOfUser();

    return achievements.filter((a) => a.condition(completitions)).map((a) => a.name);
}

async function getMaxStreak() {
    const supabase = await createClient();

    const user = await getCurrentUser();

    const { data: { max_streak }, error } = await supabase
        .from('user_stats')
        .select('max_streak')
        .eq('userID', user.id)
        .single();

    if (error || !max_streak) throw new Error('No se pudieron obtener las estadísticas del usuario');

    return max_streak ? max_streak : 0;
}

export async function checkStreakAchievements() {
    const maxStreak = await getMaxStreak();
    console.log(maxStreak);
    return streakAchievements
        .filter((a) => a.condition(maxStreak))
        .map((a) => a.name);
}

export async function updateUserAchievements(total, streak, userID) {
    const supabase = await createClient();

    const { data: existing, error } = await supabase
        .from('user_achievements')
        .select('name')
        .eq('userID', userID);

    if (error) throw new Error('Error obteniendo logros desbloqueados');

    const unlocked = new Set((existing || []).map(a => a.name));

    const now = new Date().toISOString();

    const newlyUnlocked = [
        ...achievements.filter(a => a.condition(total)),
        ...streakAchievements.filter(a => a.condition(streak))
    ].filter(a => !unlocked.has(a.name));

    if (newlyUnlocked.length > 0) {
        const insertData = newlyUnlocked.map(a => ({
            name: a.name,
            unlocked_at: now,
            userID: userID
        }));

        const { error: insertError } = await supabase
            .from('user_achievements')
            .insert(insertData);

        if (insertError) {
            console.error("Error insertando logros:", insertError);
            throw new Error("No se pudieron guardar los logros nuevos");
        }

        return insertData; // por si querés mostrarlos
    }

    return [];
}

export async function changeUserStats(completed) {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('Usuario no autenticado');

    const userID = user.id;

    const prevCompletitions = await getTotalCompletitonsOfUser();
    const completitions = prevCompletitions + completed;

    // Traer current_streak y last_completed
    const { data, error: fetchError } = await supabase
        .from('user_stats')
        .select('current_streak, last_completed, max_streak')
        .eq('userID', userID)
        .single();

    if (fetchError || !data) throw new Error('No se pudo obtener la racha actual');

    let { current_streak, last_completed, max_streak } = data;

    const now = new Date();
    const last = last_completed ? new Date(last_completed) : null;

    let shouldUpdateStreak = true;

    // Diferencia en días entre now y last_completed
    if (last) {
        const diffTime = now.getTime() - last.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            // Ya completó hoy → no cambiar la racha
            shouldUpdateStreak = false;
        } else if (diffDays === 1) {
            // Completó ayer → sumar a la racha
            current_streak += 1;
        } else {
            // Más de 1 día → racha rota
            current_streak = 1;
        }
    } else {
        // No había ninguna completación previa
        current_streak = 1;
    }

    // Actualizar la racha máxima si es necesario
    if (current_streak > max_streak) {
        max_streak = current_streak;
    }

    // Actualizar en la base de datos
    const { error: updateError } = await supabase
        .from('user_stats')
        .upsert({
            userID,
            total_completitions: completitions,
            current_streak,
            max_streak,
            last_completed: shouldUpdateStreak ? now.toISOString() : last_completed
        }, { onConflict: 'userID' });

    if (updateError) {
        console.error('Error actualizando user_stats:', updateError);
        throw new Error('No se pudo actualizar las estadísticas del usuario');
    }

    const unlocked = await updateUserAchievements(completitions, max_streak, userID);

    return unlocked;
}

