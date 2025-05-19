'use client'

import React from 'react'
import { IconEditCircle } from '@tabler/icons-react';
function HabitInfoTitle({ title, when, personToBe, color, onOpen }) {

    function hexToRgba(hex, opacity) {
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgba(${r}, ${g}, ${b}, ${opacity})`
    }

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