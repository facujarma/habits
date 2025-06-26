import { Skeleton } from '@heroui/skeleton'
import { useGym } from '@root/context/gymContext'
import React from 'react'
import ExerciceCard from './ExerciceCard'

function GymExercicesList() {

    const { exercices, loading } = useGym()

    return (
        <div className='flex flex-col gap-4 mt-6 py-2'>
            {
                loading ?
                    <div className='flex flex-col gap-4'>
                        <Skeleton className="z-20 w-full h-32 rounded-2xl" />
                        <Skeleton className="z-20 w-full h-32 rounded-2xl" />
                        <Skeleton className="z-20 w-full h-32 rounded-2xl" />

                    </div> :
                    exercices.map((exercice) => (
                        <ExerciceCard key={exercice.id} exercice={exercice} />
                    ))
            }
        </div>
    )
}

export default GymExercicesList