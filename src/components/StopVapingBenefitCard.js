'use client'

import React from 'react'
import { motion } from 'motion/react'
function StopVapingBenefitCard({ title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }} className='z-10 bg-[#666F9A]/40 border-2 border-[#666F9A] rounded-2xl flex flex-col gap-2 w-full justify-center px-4 py-2'>
      <h3 className='font-bold text-white text-base'> {title} </h3>
      <p className='text-white text-sm'> {text} </p>
    </motion.div>
  )
}

export default StopVapingBenefitCard