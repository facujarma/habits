import RoomChat from '@root/components/rooms/RoomChat'
import RoomChatHeader from '@root/components/rooms/RoomChatHeader'
import { RoomsProvider } from '@root/context/roomsContext'
import React from 'react'

async function page({ params }) {

    const { id } = await params

    return (
        <div className='w-full h-[73vh]'>
            <RoomsProvider>
                <RoomChatHeader id={id} />
                <RoomChat roomID={id} />
            </RoomsProvider>
        </div>
    )
}

export default page