import React from 'react'

function OwnMessage({ message }) {
    return (
        <li className='flex flex-col w-full items-end'>
            <span className='text-[#C5C5C5] text-sm'>You</span>
            <div key={message.id} className='w-fit bg-blue-500 rounded-2xl p-2'>
                <p>{message.content}</p>
            </div>
        </li>)
}

export default OwnMessage