import RoomHabitAllInfo from '@rooms/RoomHabitAllInfo'
import { RoomsProvider } from '@root/context/roomsContext'
import React from 'react'

async function page({ params }) {

    const { id } = await params

    return (
        <div className="w-full h-full">
            <RoomsProvider>
                <RoomHabitAllInfo habitID={id} />
            </RoomsProvider>
        </div>
    )
}

export default page