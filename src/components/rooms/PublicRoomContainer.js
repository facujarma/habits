'use client'

import { Button } from '@heroui/react'
import { redirect } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

function PublicRoomContainer({ room }) {
    const { t } = useTranslation('common')

    return (
        <div className='w-full flex justify-between items-center my-4 border border-[#616161] bg-[#242424]/40 rounded-2xl p-4'>
            <div className='flex flex-col w-full'>
                <h2 className='text-3xl text-white font-bold'>{room.name}</h2>
                <p className='text-base text-[#C5C5C5]'>{room.description}</p>
                <span>{t('publicRoomContainer_habitsLabel')} {room.habitsCount}</span>
                <Button color='primary' className='w-full' onClick={() => redirect(`/api/invite/${room.code}`)}>
                    {t('publicRoomContainer_joinButton')}
                </Button>
            </div>
        </div>
    )
}

export default PublicRoomContainer
