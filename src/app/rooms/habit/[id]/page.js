import RoomHabitAllInfo from '@root/components/RoomHabitAllInfo'
import { RoomsProvider } from '@root/context/roomsContext'
import React from 'react'

async function page({ params }) {

    const { id } = await params

    return (
        <div className="w-full h-full">
            <RoomsProvider>
                <RoomHabitAllInfo roomId={id} />
            </RoomsProvider>
        </div>
    )
}

export default page