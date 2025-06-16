import React from 'react'

function ExternalMessage({ message }) {
    return (
        <li className='flex flex-col'>
            <span className='text-[#C5C5C5] text-sm'>{message.username}</span>
            <div className='w-fit bg-[#242424] rounded-2xl p-2'>
                <p>{message.content}</p>
            </div>
        </li>
    )
}

export default ExternalMessage