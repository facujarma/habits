'use client'

import { checkCompletitionsAchivements, checkStreakAchievements } from '@root/utils/achievementsManager';
import React, { useEffect, useState } from 'react'
import CompletitionsAchivementsList from './CompletitionsAchivementsList';
import { useFormState } from 'react-dom';

function Achivements() {
    const [completedAchivements, setCompletedAchivements] = useState([]);
    const [streakAchivements, setStreakAchivements] = useState([]);
    const [loading, setLoading] = useState(true);

    const allAchievements = [
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


    useEffect(() => {
        const loadAchievements = async () => {
            try {
                const [completed, streaks] = await Promise.all([
                    checkCompletitionsAchivements(),
                    checkStreakAchievements()
                ]);
                setCompletedAchivements(completed);
                setStreakAchivements(streaks);
                console.log("Completed:", completed);
                console.log("Streaks:", streaks);
            } catch (err) {
                console.error("Error loading achievements:", err);
            } finally {
                setLoading(false);
            }
        }

        loadAchievements();
    }, []);

    return (
        <div>
            <div className='w-full flex flex-col gap-2 mt-4'>
                <h2 className='text-xl text-[#C5C5C5]'>Completitions Achievements</h2>
                <CompletitionsAchivementsList
                    loading={loading}
                    achievements={allAchievements}
                    achivements={completedAchivements}
                />
                <h2 className='text-xl text-[#C5C5C5]'>Streaks Achievements</h2>
                <CompletitionsAchivementsList
                    loading={loading}
                    achievements={streakAchievements}
                    achivements={streakAchivements}
                />
            </div>
        </div>
    );
}

export default Achivements;
