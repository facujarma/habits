'use client'

import { useGym } from '@root/context/gymContext'
import React, { useEffect, useState } from 'react'
import SessionWorkoutCard from './SessionWorkoutCard'
import { addToast } from '@heroui/toast'
import SessionExerciceList from './SessionExerciceList'
import { startSession } from '@root/utils/gym'
import { redirect } from 'next/navigation'

function SessionExercices({ workoutID }) {

    const { workouts, exercices } = useGym()

    const [workout, setWorkout] = useState(null)
    const [workoutExercices, setWorkoutExercices] = useState([])

    const start = async () => {
        try {
            await startSession(workoutID)
            addToast({ title: "Success", description: "Session started", color: "success", timeout: 2000 })
        } catch (e) {
            addToast({ title: "Error", description: "Error starting session", color: "danger", timeout: 2000 })
            redirect('/gym')
        }
    }

    useEffect(() => {

        const workout = workouts.find(workout => workout.id.toString() === workoutID)
        if (!workout) {
            addToast({ title: "Error", description: "Workout not found", color: "danger", timeout: 2000 })
        }
        else {
            setWorkout(workout)
            const workoutExercices = exercices.filter(exercice => workout.exercicesIDs.includes(exercice.id))
            setWorkoutExercices(workoutExercices)
            start()
        }
    }, [workouts, exercices, workoutID])

    return (
        <div className='w-full '>
            {
                workout ?
                    <>
                        <SessionWorkoutCard workout={workout} />
                        <SessionExerciceList exercices={workoutExercices}  />
                    </>
                    :
                    <div className='flex flex-col gap-4 my-6'>
                        <h2 className='text-2xl'>No workout found</h2>
                        <p className='text-[#C5C5C5]'>Try to refresh the page.</p>
                    </div>
            }
        </div>
    )
}

export default SessionExercices