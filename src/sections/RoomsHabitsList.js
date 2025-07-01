import RoomInfoContainer from '@rooms/RoomInfoContainer'
import React from 'react'
import { useRooms } from '@root/context/roomsContext'
import Button from '@components/Button'
import { IconPlus } from '@tabler/icons-react'
import { redirect } from 'next/navigation'
import { Skeleton } from '@heroui/skeleton'
import { useTranslation } from 'react-i18next'

function RoomsHabitsList() {
    const { t } = useTranslation('common')
    const { loading, rooms } = useRooms()

    if (loading) {
        return (
            <div className="flex flex-col gap-4 pb-4">
                <Skeleton className="rounded-2xl">
                    <div className="w-full rounded-2xl h-32 border flex items-center py-4"></div>
                </Skeleton>
                <Skeleton className="rounded-2xl">
                    <div className="w-full rounded-2xl h-32 border flex items-center py-4"></div>
                </Skeleton>
            </div>
        )
    }

    return (
        <div>
            <div className="w-full my-6">
                <Button
                    text={t('roomsHabitsList_createButton')}
                    icon={<IconPlus />}
                    handleClick={() => {
                        redirect('/rooms/createRoom')
                    }}
                />
            </div>
            {rooms && rooms.length === 0 ? (
                <div>
                    <h2 className="text-[#C5C5C5] text-2xl text-center my-6">
                        {t('roomsHabitsList_noRoomsTitle')}
                    </h2>
                    <p className="text-[#C5C5C5]/75 text-sm text-center mb-6">
                        {t('roomsHabitsList_noRoomsDescription')}
                    </p>
                </div>
            ) : (
                rooms.map((room) => (
                    <div key={room.room.id}>
                        <RoomInfoContainer roomInfo={room.room} habits={room.habits} isAdmin={room.isAdmin} />
                    </div>
                ))
            )}
        </div>
    )
}

export default RoomsHabitsList
