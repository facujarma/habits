'use client'

import CreateSessionForm from '@root/components/gym/CreateSessionForm'
import { GymProvider } from '@root/context/gymContext'
import Header from '@root/sections/Header'
import React from 'react'
import { useTranslation } from 'react-i18next'

function page() {
    const { t } = useTranslation('common')

    return (
        <div>
            <Header
                title={t('create_new_session_title', 'Create a new session')}
                text={t('create_new_session_text', 'Create a new session to track your progress')}
                goBack='/gym'
            />
            <GymProvider>
                <CreateSessionForm />
            </GymProvider>
        </div>
    )
}

export default page
