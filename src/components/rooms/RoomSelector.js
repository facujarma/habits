'use client'

import { getRoomsWhereUserAdmin } from '@lib/rooms'
import React, { useEffect, useState } from 'react'
import { Select, Skeleton } from '@heroui/react'
import { SelectItem } from '@heroui/select'
import { useTranslation } from 'react-i18next'

function RoomSelector({ roomId }) {
    const { t } = useTranslation('common')

    const [roomIDSelected, setRoomIDSelected] = useState(roomId)
    const [loading, setLoading] = useState(true)
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        const getRoomsInWhereAdmin = async () => {
            try {
                const rooms = await getRoomsWhereUserAdmin()
                setRooms(rooms)
                setLoading(false)
            } catch (error) {
                console.error(error)
            }
        }

        getRoomsInWhereAdmin()
    }, [])

    if (loading) {
        return (
            <div className="flex flex-col gap-4 my-4">
                <h2 className="text-[#C5C5C5] font-bold text-xl">{t('select_a_room')}</h2>
                <Skeleton className="rounded-xl">
                    <Select
                        variant="faded"
                        onSelectionChange={setRoomIDSelected}
                        defaultSelectedKeys={[roomIDSelected]}
                    >
                        {rooms.map((room) => (
                            <SelectItem key={room.id}>{room.name}</SelectItem>
                        ))}
                    </Select>
                </Skeleton>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 my-4">
            <h2 className="text-[#C5C5C5] font-bold text-xl">{t('select_a_room')}</h2>
            <Select
                variant="faded"
                onSelectionChange={setRoomIDSelected}
                defaultSelectedKeys={[roomIDSelected]}
            >
                {rooms.map((room) => (
                    <SelectItem key={room.id}>{room.name}</SelectItem>
                ))}
            </Select>
        </div>
    )
}

export default RoomSelector
