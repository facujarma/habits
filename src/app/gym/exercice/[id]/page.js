import ExerciceInfo from '@root/components/gym/ExerciceInfo'
import { GymProvider } from '@root/context/gymContext'
import Header from '@root/sections/Header'
import React from 'react'

async function page({ params }) {
    const { id } = await params


    return (
        <div className='w-full h-full'>
            <Header title="Exercice info" text="Here you can see the info of an exercice" goBack='/gym' />
            <GymProvider>
                <ExerciceInfo exerciceID={id} />
            </GymProvider>
        </div>
    )
}

export default page