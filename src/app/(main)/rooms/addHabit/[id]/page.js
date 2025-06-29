'use client'

import RoomAddHabit from '@rooms/RoomAddHabit'
import RoomSelector from '@rooms/RoomSelector'
import SeparatorLine from '@components/SeparatorLine'
import { RoomsProvider } from '@root/context/roomsContext'
import Header from '@sections/Header'
import { isUserAdmin } from '@lib/rooms'
import React, { useEffect, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { addToast } from '@heroui/toast'

function Page({ params }) {
    const { t } = useTranslation('common')
    const router = useRouter()
    const [isAdmin, setIsAdmin] = useState(null)
    const { id } = params

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const adminStatus = await isUserAdmin(id)
                setIsAdmin(adminStatus)
                if (!adminStatus) {
                    addToast({
                        title: t('not_admin_redirect_message'),
                        color: 'danger',
                        timeout: 2000,
                    })
                    router.replace('/habits')
                }
            } catch (error) {
                console.error(error)
                router.replace('/habits')
            }
        }
        checkAdmin()
    }, [id, router, t])

    if (isAdmin === null) {
        return <div>{/* Loading or empty state here */}</div>
    }

    if (!isAdmin) {
        redirect('/habits')
    }

    return (
        <div>
            <RoomsProvider>
                <Header title={t('add_habit_to_room_title')} text={t('add_habit_to_room_text')} />
                <RoomSelector roomId={id} />
                <SeparatorLine />
                <p className="text-[#C5C5C5] text-base leading-6 my-5">
                    {t('complete_info_text')}
                </p>
                <RoomAddHabit roomId={id} />
            </RoomsProvider>
        </div>
    )
}

export default Page
