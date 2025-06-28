
import CreateSessionForm from '@root/components/gym/CreateSessionForm'
import { GymProvider } from '@root/context/gymContext'
import Header from '@root/sections/Header'
import React from 'react'

function page() {
    return (
        <div>
            <Header title="Create a new session" text="Create a new session to track your progress" goBack='/gym' />
            <GymProvider>
                <CreateSessionForm />
            </GymProvider>
        </div>
    )
}

export default page