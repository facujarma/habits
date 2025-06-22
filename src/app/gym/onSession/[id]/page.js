import SessionExercices from '@root/components/gym/SessionExercices'
import { GymProvider } from '@root/context/gymContext'
import Header from '@root/sections/Header'
import React from 'react'

async function page({ params }) {
    const { id } = await params
    return (
        <div>
            <Header title="On a session" text="On a session to track your progress" goBack='/gym' />
            <GymProvider>
                <SessionExercices workoutID={id} />
            </GymProvider>
        </div>
    )
}

export default page