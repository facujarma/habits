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


    const { count, error: countError } = await supabase
        .from('habit_records')
        .select('*', { count: 'exact', head: true })
        .in('habitID', habitIDs)

    console.log(count);

    return count;
}

export async function checkCompletitionsAchivements() {

    const completitions = await getTotalCompletitonsOfUser();

    return achievements.filter((a) => a.condition(completitions)).map((a) => a.name);
}


export async function getAllHabitCompletionDates() {
    const supabase = await createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("Usuario no autenticado");

    // Obtener todos los hábitos del usuario
    const { data: habits, error: habitsError } = await supabase
        .from("habit")
        .select("id")
        .eq("userID", user.id);

    if (habitsError || !habits) throw new Error("No se pudieron obtener los hábitos");

    const habitIDs = habits.map((h) => h.id);

    // Obtener todos los registros que correspondan a esos hábitos
    const { data: records, error: recError } = await supabase
        .from("habit_records")
        .select("record_date")
        .in("habitID", habitIDs);

    if (recError || !records) throw new Error("No se pudieron obtener los registros");

    const completedDates = records.map((r) =>
        typeof r.record_date === "string"
            ? r.record_date
            : new Date(r.record_date).toISOString().split("T")[0]
    );

    return completedDates;
}

function calculateMaxStreak(dates) {
    const uniqueDates = [...new Set(dates)];
    const sortedDates = uniqueDates
        .map(date => new Date(date))
        .sort((a, b) => a.getTime() - b.getTime());

    let maxStreak = 0;
    let currentStreak = 1;

    for (let i = 1; i < sortedDates.length; i++) {
        const diffDays = Math.floor(
            (sortedDates[i].getTime() - sortedDates[i - 1].getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 1) {
            currentStreak++;
        } else if (diffDays > 1) {
            maxStreak = Math.max(maxStreak, currentStreak);
            currentStreak = 1;
        }
    }

    return Math.max(maxStreak, currentStreak);
}

export async function checkStreakAchievements() {
    const dates = await getAllHabitCompletionDates();
    const maxStreak = calculateMaxStreak(dates);
    console.log("Máxima racha:", maxStreak);

    return streakAchievements
        .filter((a) => a.condition(maxStreak))
        .map((a) => a.name);
}
