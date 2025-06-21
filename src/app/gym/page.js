'use client'

import { useDisclosure } from '@heroui/modal'
import Button from '@root/components/Button'
import AddExerciceModal from '@root/components/gym/AddExerciceModal'
import GymExercicesList from '@root/components/gym/GymExercicesList'
import { GymProvider } from '@root/context/gymContext'
import Header from '@root/sections/Header'
import React from 'react'

function page() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <div className="w-full h-full">
            <Header title="Gym" text="This section is exclusively for managing your workouts. Here, you'll be able to see your progress more clearly." />
            <GymProvider>
                <div className='w-full flex flex-col gap-4'>
                    <Button text="Create new workout" />
                    <Button text="Add new exercice" handleClick={onOpen} />

                    <AddExerciceModal isOpen={isOpen} onOpenChange={onOpenChange} onOpen={onOpen} />

                </div>
                <h2 className='text-2xl text-[#C5C5C5] mt-4'>Your workouts</h2>

                <h2 className='text-2xl text-[#C5C5C5] mt-4'>Your exercices</h2>
                <GymExercicesList />

            </GymProvider>
        </div>
    )
}

export default page