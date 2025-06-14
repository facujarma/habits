'use client'

import { achievements, checkCompletitionsAchivements, checkStreakAchievements } from '@root/utils/achievementsManager';
import { IconAxisX, IconCheck, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'

function Achivements() {

    const [achivements, setAchivements] = useState([]);
    const [streakAchivements, setStreakAchivements] = useState([]);
    const [loading, setLoading] = useState(true);

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


    useEffect(() => {
        const loadCompletitionsAchivements = async () => {
            const achivements = await checkCompletitionsAchivements();
            setAchivements(achivements);
            console.log(achivements);
        }

        const loadStreakAchivements = async () => {
            const streakAchievements = await checkStreakAchievements();
            setStreakAchivements(streakAchievements);
            console.log(streakAchievements);
        }

        loadCompletitionsAchivements();
        loadStreakAchivements();
        setLoading(false);
    }, [])

    return (
        <div>
            <div className='w-full flex flex-col gap-2 mt-4'>
                <h2 className='text-xl text-[#C5C5C5]'>Completitions Achivements</h2>
                <ul className='flex gap-4 overflow-x-auto'>
                    {
                        achievements.map((a, i) => {

                            const isCompleted = achivements.some((achivement) => achivement === a.name);

                            return <li key={i} className='relative p-3 min-w-42 overflow-auto  bg-[#242424] rounded-2xl border border-[#616161]'>
                                <h3 className='font-bold text-white text-base'>{a.name}</h3>
                                <p className='text-sm'>{a.description}</p>
                                {
                                    loading ? (
                                        <p className='text-sm text-[#C5C5C5]'>Loading...</p>
                                    )
                                        :
                                        (
                                            <span className={`w-6 flex items-center justify-center aspect-square rounded-full absolute bottom-4 right-4 z-20 
                                                ${isCompleted ? 'bg-green-600' : 'bg-[#242424] border border-[#616161]'}`}

                                            >
                                                {
                                                    isCompleted ?
                                                        <IconCheck />
                                                        :
                                                        <IconX />
                                                }
                                            </span>
                                        )
                                }
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Achivements