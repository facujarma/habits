'use client'

import { useDisclosure } from '@heroui/modal'
import Button from '@root/components/Button'
import AddExerciceModal from '@root/components/gym/AddExerciceModal'
import GymExercicesList from '@root/components/gym/GymExercicesList'
import GymSessionsList from '@root/components/gym/GymSessionsList'
import OnSessionBanner from '@root/components/gym/OnSessionBanner'
import { GymProvider } from '@root/context/gymContext'
import Header from '@root/sections/Header'
import { useTranslation } from 'react-i18next'
import { redirect } from 'next/navigation'
import React from 'react'

function page() {
    const { t } = useTranslation('common')
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <div className="w-full h-full">
            <Header title={t('gym_title')} text={t('gym_text')} />
            <GymProvider>
                <OnSessionBanner />

                <div className="w-full flex flex-col gap-4">
                    <Button
                        text={t('gym_create_new_workout')}
                        handleClick={() => {
                            redirect('/gym/createSession')
                        }}
                    />
                    <Button text={t('gym_add_new_exercice')} handleClick={onOpen} />

                    <AddExerciceModal isOpen={isOpen} onOpenChange={onOpenChange} onOpen={onOpen} />
                </div>

                <h2 className="text-2xl text-[#C5C5C5] mt-4">{t('gym_your_workouts')}</h2>
                <GymSessionsList />
                <h2 className="text-2xl text-[#C5C5C5] mt-4">{t('gym_your_exercices')}</h2>
                <GymExercicesList />
            </GymProvider>
        </div>
    )
}

export default page
