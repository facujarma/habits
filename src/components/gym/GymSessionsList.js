import { Skeleton } from '@heroui/skeleton'
import { useGym } from '@root/context/gymContext'
import React from 'react'
import WorkoutCard from './WorkoutCard'

function GymSessionsList() {

    const { loading, workouts } = useGym()

    return (
        <div className='flex flex-col gap-4 my-6'>
            {
                loading ?
                    <Skeleton className="z-20 w-full h-32 rounded-2xl" /> :
                    workouts.map((workout) => (
                        <WorkoutCard key={workout.id} workout={workout} />
                    ))
            }
        </div>
    )
}

export default GymSessionsList