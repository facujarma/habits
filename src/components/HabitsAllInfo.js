'use client'

import { useState, useEffect } from 'react'
import { getHabitFullData } from '@root/utils/habits'
import { Spinner } from '@heroui/spinner'
import HabitInfoTitle from './HabitInfoTitle'
import { addToast } from '@heroui/toast'
import HabitStats from './HabitStats'
import HabitCalendar from './HabitCalendar'

export default function HabitsAllInfo({ habitID }) {
    const [habitInfo, setHabitInfo] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchHabitInfo() {
            setLoading(true)
            try {
                const data = await getHabitFullData(habitID)
                setHabitInfo(data)
                console.log(data)
            } catch (err) {
                addToast({
                    title: 'Error',
                    message: "No se puso obtener la información del hábito.",
                    type: 'danger',
                })
            } finally {
                setLoading(false)
            }
        }

        fetchHabitInfo()
    }, [])

    function getHabitCompletionPercentage(habit, today = new Date()) {
        const createdAt = new Date(habit.created_at);
        const scheduledDays = new Set(habit.scheduledWeekdays); // días 0-6
        const completedDates = new Set(habit.completedDates);

        let totalScheduled = 0;

        const current = new Date(createdAt);

        while (current <= today) {
            const weekday = current.getUTCDay();
            const dateStr = current.toISOString().split("T")[0];

            if (scheduledDays.has(weekday)) {
                totalScheduled++;
            }

            current.setUTCDate(current.getUTCDate() + 1); // avanzar al día siguiente
        }

        const totalCompleted = Array.from(completedDates).filter(date => {
            const d = new Date(date);
            return d >= createdAt && d <= today;
        }).length;

        const percentage = totalScheduled === 0 ? 0 : Math.round((totalCompleted / totalScheduled) * 100);
        return percentage;
    }
    function getMaxStreak(habit) {
        const completedDates = habit.completedDates
            .map(date => date.split("T")[0]) // solo fecha
            .sort(); // ascendente

        const completedSet = new Set(completedDates);
        const scheduled = new Set(habit.scheduledWeekdays);

        let maxStreak = 0;
        let currentStreak = 0;

        for (let i = 0; i < completedDates.length; i++) {
            const dateStr = completedDates[i];
            const current = new Date(dateStr);
            const prev = new Date(current);
            prev.setUTCDate(prev.getUTCDate() - 1);

            const isCurrentScheduled = scheduled.has(current.getUTCDay());
            const isPrevScheduled = scheduled.has(prev.getUTCDay());
            const prevStr = prev.toISOString().split("T")[0];

            if (!isCurrentScheduled) continue;

            if (completedSet.has(prevStr) && isPrevScheduled) {
                currentStreak += 1;
            } else {
                currentStreak = 1;
            }

            if (currentStreak > maxStreak) {
                maxStreak = currentStreak;
            }
        }

        return maxStreak;
    }


    if (loading) return <Spinner color="primary" />
    return (
        <div className="flex flex-col gap-8">
            <HabitInfoTitle title={habitInfo.name} />
            <HabitStats totalCompletitions={habitInfo.totalCompletions} maxStreak={getMaxStreak(habitInfo)} completionPercentage={getHabitCompletionPercentage(habitInfo)} />
            <div className='w-full flex justify-center '>
                <HabitCalendar dates={habitInfo.completedDates} />
            </div>
        </div>
    )
}
