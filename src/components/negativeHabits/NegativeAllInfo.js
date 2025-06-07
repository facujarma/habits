'use client'

import { useState, useEffect } from 'react'
import { addToast } from '@heroui/toast'
import HabitStats from './HabitStats'
import HabitCalendar from './HabitCalendar'
import { Skeleton } from '@heroui/skeleton'
import { useDisclosure } from '@heroui/modal'
import { getNegativeAllData } from '@lib/negativeHabit'
import NegativeInfoTitle from '../NegativeInfoTitle'
import EditNegativeModal from '../EditNegativeModal'

export default function NegativeAllInfo({ negativeID }) {
    const [habitInfo, setHabitInfo] = useState([])
    const [loading, setLoading] = useState(true)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        async function fetchNegativeInfo() {
            setLoading(true)
            try {
                const data = await getNegativeAllData(negativeID)

                setHabitInfo(data)
                setLoading(false)
            } catch (err) {
                addToast({
                    title: 'Error',
                    message: "An error occurred while getting the information.",
                    type: 'danger',
                })
                console.log(err)
            }
        }

        fetchNegativeInfo()
    }, [])

    function getHabitCompletionPercentage(habit, today = new Date()) {
        const createdAt = new Date(habit.created_at);
        const scheduledDays = new Set(habit.scheduledWeekdays); // días 0-6
        const completedDates = new Set(habit.completedDates);

        let totalScheduled = 0;

        const current = new Date(createdAt);

        while (current <= today) {
            const weekday = current.getUTCDay();

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
        if (!habit.completedDates || !habit.scheduledWeekdays) return 0
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
    if (loading || !habitInfo) return (
        <div className="flex flex-col gap-8">
            <Skeleton className='rounded-2xl'>
                <div className="w-full h-20 bg-[#242424] rounded-2xl border border-[#616161] flex items-center">

                </div>
            </Skeleton>
            <div className='w-full h-40 py-2 flex items-center justify-between gap-4 overflow-x-auto'>

                <Skeleton className='rounded-2xl'>
                    <div className="min-w-36 max-h-full aspect-square bg-[#242424] border border-[#616161] rounded-2xl flex flex-col items-center">
                    </div>
                </Skeleton>

                <Skeleton className='rounded-2xl'>
                    <div className="min-w-36 max-h-full aspect-square bg-[#242424] border border-[#616161] rounded-2xl flex flex-col items-center">
                    </div>
                </Skeleton>

                <Skeleton className='rounded-2xl'>
                    <div className="min-w-36 max-h-full aspect-square bg-[#242424] border border-[#616161] rounded-2xl flex flex-col items-center">
                    </div>
                </Skeleton>
            </div>
            <Skeleton className='rounded-2xl'>
                <div className="w-full aspect-square ">

                </div>
            </Skeleton>
        </div>
    )
    return (
        <div className="flex flex-col gap-8">
            <NegativeInfoTitle onOpen={onOpen} badHabit={habitInfo.bad_habit} goodHabit={habitInfo.good_habit} color={habitInfo.color} />
            <HabitStats totalCompletitions={habitInfo.totalCompletions} maxStreak={getMaxStreak(habitInfo)} completionPercentage={getHabitCompletionPercentage(habitInfo)} />
            <div className='mt-12 w-full flex justify-center scale-130 '>
                <HabitCalendar dates={habitInfo.completedDates} />
            </div>
            <EditNegativeModal negativeID={habitInfo.id} defBad={habitInfo.bad_habit} defGood={habitInfo.good_habit} isOpen={isOpen} onOpenChange={onOpenChange} onOpen={onOpen} />
        </div>
    )
}
