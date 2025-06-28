import EditWorkoutForm from '@root/components/gym/EditWorkoutForm'
import { GymProvider } from '@root/context/gymContext'
import Header from '@root/sections/Header'
import React from 'react'

async function page({ params }) {

  const { id } = await params

  return (
    <div className='w-full h-full'>
      <Header title="Edit a session" text="Here you can edit a session from your collection." goBack='/gym' />
      <GymProvider>
        <EditWorkoutForm workoutID={id} />
      </GymProvider>
    </div>
  )
}

export default page