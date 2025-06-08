'use client'

import { motion } from "motion/react"
import { IconArrowBarToRight } from '@tabler/icons-react'
import React from 'react'
import { redirect } from "next/navigation"

function FullJournalButton() {
    return (
        <motion.button
            onClick={() => {
                redirect("/journaling/entries")
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='mt-4 z-20 w-full h-18 bg-[#666F9A]/40 border border-[#666F9A] rounded-2xl flex items-center justify-between px-4'>
            <span className='z-20 text-white text-xl'>Your full journal</span>
            <IconArrowBarToRight className='z-20' size={36} color='#666F9A' />
        </motion.button>
    )
}

export default FullJournalButton