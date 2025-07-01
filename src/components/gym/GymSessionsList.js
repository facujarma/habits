'use client'

import { Skeleton } from '@heroui/skeleton'
import { useGym } from '@root/context/gymContext'
import React from 'react'
import WorkoutCard from './WorkoutCard'
import { useTranslation } from 'react-i18next'

function GymSessionsList() {
    const { t } = useTranslation('common')
    const { loading, workouts } = useGym()

    return (
        <div className='flex flex-col gap-4 my-6'>
            {
                loading ? (
                    <Skeleton className="z-20 w-full h-32 rounded-2xl" />
                ) : workouts.length === 0 ? (
                    <div className='flex items-center justify-center text-center text-[#C5C5C5]'>
                        {t('no_workouts')}
                    </div>
                ) : (
                    workouts.map((workout) => (
                        <WorkoutCard key={workout.id} workout={workout} />
                    ))
                )
            }
        </div>
    )
}

export default GymSessionsList
