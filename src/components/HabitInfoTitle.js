'use client'

import React from 'react'
import { IconEditCircle } from '@tabler/icons-react';
import { hexToRgba } from '@root/utils/color';
function HabitInfoTitle({ title, when, personToBe, color, onOpen }) {

    const backgroundColor = hexToRgba(color, 0.37)

    return (
        <div className="w-full rounded-2xl border flex items-center py-4" style={{ backgroundColor, borderColor: color }}>
            <div className='px-4 py-2 h-full flex flex-col gap-4'>
                <button className='w-full p-2 border rounded-md' onClick={onOpen} style={{ backgroundColor, borderColor: color }}>
                    <IconEditCircle />
                </button>
            </div>
            <div className='h-full flex-1'>
                <h1 className="text-2xl font-bold text-white mb-4">{title}</h1>
                <div>
                    <p className='mb-2 text-sm text-[#E8E8E8]'> <b>You will do it:</b> {when} </p>
                    <p className='mb-2 text-sm text-[#E8E8E8]'> <b>Because you want to be:</b> {personToBe}</p>
                </div>
            </div>
        </div>
    )
}

export default HabitInfoTitle