'use client'

import React from 'react'

function SettingItem({ text, description, icon, handleClick }) {
    return (
        <li className='w-full'>
            <button
                onClick={handleClick}
                className={`flex flex-col items-start w-full border 
                border-[#242424] bg-[#0D0D0D] rounded-2xl 
                text-xl text-[#C5C5C5] py-2 px-6 duration-300 ${handleClick && 'hover:bg-[#242424] hover:cursor-pointer'}`}>
                <span className='flex gap-2 items-center text-start'>
                    {
                        icon
                    }
                    {
                        text
                    }
                </span>
                {
                    description &&
                    <span className='ml-8 text-start text-sm text-[#C5C5C5]'>
                        {description}
                    </span>
                }
            </button>
        </li >)
}

export default SettingItem