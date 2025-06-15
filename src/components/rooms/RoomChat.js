'use client'

import useRealtimeMessages from '@root/hooks/UseRealtimeMessages';
import React from 'react'
import SendRoomMessage from './SendRoomMessage';

function RoomChat({ roomID }) {

    const messages = useRealtimeMessages(roomID);

    return (
        <div className='w-full flex flex-col gap-4 h-full'>
            <ul className='flex-1 w-full flex flex-col gap-2'>
                {
                    messages.length == 0 ? <p className='text-center'>Be the first to send a message</p> :
                        messages.map((message) => (
                            <li className='flex flex-col'>
                                <span className='text-[#C5C5C5] text-sm'>{message.username}</span>
                                <div key={message.id} className='w-fit bg-[#242424] rounded-2xl p-2'>
                                    <p>{message.content}</p>
                                </div>
                            </li>
                        ))
                }
            </ul>
            <SendRoomMessage roomID={roomID} />
        </div>
    )
}

export default RoomChat