import React, { useState } from 'react'
import Input from '../Input'
import { addToast, Button } from '@heroui/react'
import { IconSend } from '@tabler/icons-react'
import { sendMessage } from '@root/utils/rooms'

function SendRoomMessage({ roomID }) {

    const [message, setMessage] = useState('')

    const handleSend = () => {
        if (message.length == 0) {
            addToast({
                title: 'Error',
                description: 'Please enter a message',
                color: 'danger'
            })
            return;
        }
        sendMessage(roomID, message)
    }

    return (
        <div className='w-full flex gap-2 items-center'>
            <Input className='flex-1' placeholder={"Send a message..."} setText={setMessage} />
            <Button className='h-12' onClick={handleSend}>
                <IconSend />
            </Button>
        </div>
    )
}

export default SendRoomMessage