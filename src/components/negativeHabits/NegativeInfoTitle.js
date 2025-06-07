import { hexToRgba } from '@lib/color'
import { IconEditCircle } from '@tabler/icons-react'
import React from 'react'

function NegativeInfoTitle({ badHabit, goodHabit, color, onOpen }) {

    const backgroundColor = hexToRgba(color, 0.37)
    return (
        <div className="px-2 w-full rounded-2xl border flex items-center py-4" style={{ backgroundColor, borderColor: color }}>
            <div className='px-4 py-2 h-full flex flex-col gap-4'>
                <button className='w-full p-2 border rounded-md' style={{ backgroundColor, borderColor: color }}
                    onClick={onOpen}>
                    <IconEditCircle />
                </button>
            </div>
            <div className='h-full flex-1'>
                <h1 className="text-2xl font-bold text-white ">{badHabit}</h1>
                <p>Instead you will...</p>
                <div className='w-full px-2 py-1 border  rounded-full mt-3' style={{ backgroundColor, borderColor: color }}>
                    <p className="text-base text-[#C5C5C5] text-left w-full"> {goodHabit} </p>
                </div>
            </div>
        </div>
    )
}

export default NegativeInfoTitle