'use client'

import { Skeleton } from '@heroui/skeleton'
import { useGym } from '@root/context/gymContext'
import React from 'react'
import ExerciceCard from './ExerciceCard'
import { useTranslation } from 'react-i18next'

function GymExercicesList() {
    const { exercices, loading } = useGym()
    const { t } = useTranslation('common')

    return (
        <div className='flex flex-col gap-4 mt-6 py-2'>
            {
                loading ? (
                    <div className='flex flex-col gap-4'>
                        <Skeleton className="z-20 w-full h-32 rounded-2xl" />
                        <Skeleton className="z-20 w-full h-32 rounded-2xl" />
                        <Skeleton className="z-20 w-full h-32 rounded-2xl" />
                    </div>
                ) : exercices.length === 0 ? (
                    <div className='flex items-center justify-center text-center text-[#C5C5C5]'>{t('no_exercices')}</div>
                ) : (
                    exercices.map((exercice) => (
                        <ExerciceCard key={exercice.id} exercice={exercice} />
                    ))
                )
            }
        </div>
    )
}

export default GymExercicesList
