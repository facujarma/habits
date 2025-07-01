'use client'

import EditWorkoutForm from '@root/components/gym/EditWorkoutForm'
import { GymProvider } from '@root/context/gymContext'
import Header from '@root/sections/Header'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Page({ params }) {
  const { t } = useTranslation('common')
  const { id } = params

  return (
    <div className='w-full h-full'>
      <Header
        title={t('edit_session_title', 'Edit a session')}
        text={t('edit_session_text', 'Here you can edit a session from your collection.')}
        goBack='/gym'
      />
      <GymProvider>
        <EditWorkoutForm workoutID={id} />
      </GymProvider>
    </div>
  )
}

export default Page
