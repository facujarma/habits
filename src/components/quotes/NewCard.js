'use client'

import React from 'react'
import { motion } from "motion/react"
function NewCard({ title, text, author }) {
    return (
        <motion.div className='flex flex-col gap-2 w-full aspect-[5/3] p-2 bg-[#242424] border border-[#616161] rounded-2xl'>
            <h3 className='font-bold text-white text-2xl'> <span className='text-[#3F3F3F]'>"</span>
                {title}
                <span className='text-[#3F3F3F]'  >"</span> </h3>
            <p className='flex-1 text-[#C5C5C5] '>
                {text}
            </p>
            <div className='w-full flex justify-end'>
                <span className='text-[#C5C5C5] text-sm'>{author}</span>
            </div>
        </motion.div>
    )
}

export default NewCard