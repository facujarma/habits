'use client'

import { addToast } from '@heroui/toast'
import { getVApeCounterForWeek, getVapeCountersForLast10Weeks } from '@lib/vape'
import React, { useEffect, useState } from 'react'

function VapeMessage() {
    const [loading, setLoading] = useState(true)
    const [weekPuffs, setWeekPuffs] = useState(0)
    const [past10WeeksPuffs, setPast10WeeksPuffs] = useState([])

    useEffect(() => {
        async function loadWeekPuffs() {
            try {
                const totalWeekPuffs = await getVApeCounterForWeek()
                setWeekPuffs(totalWeekPuffs);
            } catch (error) {
                addToast({
                    title: "Error",
                    description: "Ha ocurrido un error al obtener la cantidad de puffs de la semana.",
                    color: "danger",
                    timeout: 2000
                })
                console.error(error);
            }

        }

        async function loadPast10WeeksPuff() {
            try {
                const totalPast10WeeksPuffs = await getVapeCountersForLast10Weeks()
                setPast10WeeksPuffs(totalPast10WeeksPuffs)
                setLoading(false)

            } catch (error) {
                addToast({
                    title: "Error",
                    description: "Ha ocurrido un error al obtener la cantidad de puffs de las 10 semanas.",
                    color: "danger",
                    timeout: 2000
                })
            }
        }
        loadWeekPuffs()
        loadPast10WeeksPuff()
    }, [])

    console.log(past10WeeksPuffs)
    let thisWeekBeats = 0
    past10WeeksPuffs.forEach(week => {
        if (week > weekPuffs || week == -1) {
            thisWeekBeats++
        }
    });

    const thisWeekBeatsPercentage = (thisWeekBeats / 10) * 100

    function getEncouragementMessage(percentage) {
        if (percentage === 100) return "Best week so far! 🏆";
        if (percentage >= 90) return "Almost your best week!";
        if (percentage >= 80) return "You’re crushing it 💪";
        if (percentage >= 70) return "That’s real progress! 🙌";
        if (percentage >= 60) return "Momentum’s building 🚀";
        if (percentage >= 50) return "Half your weeks beat — nice!";
        if (percentage >= 40) return "Almost halfway there!";
        if (percentage >= 30) return "You’re getting there!";
        if (percentage >= 20) return "Every step counts 👣";
        if (percentage >= 10) return "Progress starts small 🌱";
        return "Keep going, you’ve got this!";
    }

    if (loading) {
        return (
            <div className='flex flex-col gap-4 w-full items-center mt-6'>
                <h4 className='font-bold text-[#C5C5C5] text-lg'> Wait a moment... </h4>
                <div className='w-fit bg-[#151A31] border border-[#666F9A] rounded-full px-3 py-1'>
                    <span className="text-[#BEBEBE] text-sm">Better than the --- of your weeks</span>
                </div>
                <span className='text-[#C5C5C5] text-sm'>-- puff on the week</span>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-4 w-full items-center mt-6'>
            <h4 className='font-bold text-[#23B184] text-lg'> {getEncouragementMessage(thisWeekBeatsPercentage)} </h4>
            <div className='w-fit bg-[#151A31] border border-[#666F9A] rounded-full px-3 py-1'>
                <span className="text-[#BEBEBE] text-sm">Better than the {thisWeekBeatsPercentage.toFixed(0)}% of your weeks</span>
            </div>
            <span className='text-[#C5C5C5] text-sm'>{weekPuffs} puff on the week</span>
        </div>
    )
}

export default VapeMessage