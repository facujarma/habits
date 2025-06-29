'use client'

import React from 'react'
import CreateRoomForm from '@sections/CreateRoomForm'
import Header from '@sections/Header'
import { useTranslation } from 'react-i18next'

function Page() {
    const { t } = useTranslation('common')

    return (
        <div className="w-full h-full mb-10">
            <Header title={t('create_new_room_title')} text={t('create_new_room_text')} />
            <CreateRoomForm />
        </div>
    )
}

export default Page
