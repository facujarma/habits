'use client'

import { hexToRgba } from '@root/utils/color'
import { motion } from 'motion/react'
import { IconCirclePlus } from '@tabler/icons-react'
import React from 'react'

function HabitTemplateCard({ color, title, text, handleClick }) {

    const backgroundColor = hexToRgba(color, 0.37)

    return (
        <div className='w-full flex gap-6'>
            <div className={`w-full p-3 border-2 rounded-2xl`} style={{ borderColor: color, backgroundColor }}>
                <h2 className='text-xl text-white'> {title} </h2>
                <p className='text-base text-[#C5C5C5]'>
                    {text}
                </p>
            </div>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleClick()}
                className={`'h-full w-24 border-2 flex items-center justify-center rounded-2xl`} style={{ borderColor: color, backgroundColor }}>
                <IconCirclePlus />
            </motion.button>
        </div>
    )
}

export default HabitTemplateCard