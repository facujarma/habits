import { addToast } from '@heroui/toast'
import { getBasicInfoFromPublicRooms } from '@lib/rooms'
import React, { useEffect, useState } from 'react'
import PublicRoomContainer from './PublicRoomContainer'
import { Skeleton } from '@heroui/skeleton'
import SearchPublicRoom from './SearchPublicRoom'
import { useTranslation } from 'react-i18next'

function RoomsPublicList() {
    const { t } = useTranslation('common')
    const [publicRooms, setPublicRooms] = useState([])
    const [searchedRooms, setSearchedRooms] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchPublicHabits = async () => {
        try {
            const publicRooms = await getBasicInfoFromPublicRooms(10)
            setPublicRooms(publicRooms)
            setSearchedRooms(publicRooms)
            setLoading(false)
        } catch (error) {
            console.error(error)
            addToast({
                title: t('roomsPublicList_toast_error_title'),
                description: t('roomsPublicList_toast_error_description'),
                color: 'danger',
                timeout: 2000
            })
        }
    }

    useEffect(() => {
        fetchPublicHabits()
    }, [])

    const search = async (query) => {
        if (query === '') return await fetchPublicHabits()
        const newRooms = publicRooms.filter(
            (room) =>
                room.name.toLowerCase().includes(query.toLowerCase()) ||
                room.description.toLowerCase().includes(query.toLowerCase())
        )
        setSearchedRooms(newRooms)
    }

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
            <h2 className="font-bold text-[#C5C5C5] text-3xl mt-10">{t('roomsPublicList_title')}</h2>
            <SearchPublicRoom search={search} />
            {searchedRooms && searchedRooms.length === 0 ? (
                <span className="text-[#C5C5C5]">{t('roomsPublicList_noRoomsFound')}</span>
            ) : (
                searchedRooms.map((room) => <PublicRoomContainer key={room.name} room={room} />)
            )}
        </div>
    )
}

export default RoomsPublicList
