'use client'

import useRealtimeMessages from '@root/hooks/UseRealtimeMessages';
import React, { useEffect, useState } from 'react'
import SendRoomMessage from './SendRoomMessage';
import { getUserInformation } from '@root/utils/user';
import ExternalMessage from './ExternalMessage';
import OwnMessage from './OwnMessage';

function RoomChat({ roomID }) {

    const messages = useRealtimeMessages(roomID);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadUsername = async () => {
            const userData = await getUserInformation()
            setUsername(userData.username);
            setLoading(false);
        }
        loadUsername()
    }, [])


    if (loading) return <p>Loading...</p>

    return (
        <div className='w-full flex flex-col gap-4 h-full'>
            <ul className='flex-1 w-full flex flex-col gap-2'>
                {
                    messages.length == 0 ? <p className='text-center'>Be the first to send a message</p> :
                        messages.map((message) => (
                            message.username == username ? <OwnMessage key={message.id} message={message} /> :
                                <ExternalMessage key={message.id} message={message} />
                        ))
                }
            </ul>
            <SendRoomMessage roomID={roomID} />
        </div>
    )
}

export default RoomChat