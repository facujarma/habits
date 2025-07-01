'use client'

import React from 'react'
import ExerciceInfo from '@root/components/gym/ExerciceInfo'
import { GymProvider } from '@root/context/gymContext'
import Header from '@root/sections/Header'
import { useTranslation } from 'react-i18next'

function Page({ params }) {
    const { t } = useTranslation('common')
    const { id } = params

    return (
        <div className='w-full h-full'>
            <Header
                title={t('exercice_info_title', 'Exercice info')}
                text={t('exercice_info_text', 'Here you can see the info of an exercice')}
                goBack='/gym'
            />
            <GymProvider>
                <ExerciceInfo exerciceID={id} />
            </GymProvider>
        </div>
    )
}

export default Page
