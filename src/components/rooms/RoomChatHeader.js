'use client'

import { useRooms } from '@root/context/roomsContext'
import Header from '@root/sections/Header';
import React, { useEffect, useState } from 'react'

function RoomChatHeader({ id }) {

    const { rooms } = useRooms();
    const [room, setRoom] = useState({});
    useEffect(() => {
        const room = rooms.find(room => room.room.id.toString() === id);

        if (room) {
            setRoom(room.room);
        }
    }, [rooms])


    return (
        <div>
            {
                room && (
                    <Header title={room.name} text={room.description} />
                )
            }
        </div>
    )
}

export default RoomChatHeader