'use client'

import { IconArrowAutofitRight } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { userIsInProgram } from '@lib/vape'
import { Skeleton } from '@heroui/skeleton'
import { useTranslation } from 'react-i18next'

function StopVapingBanner() {
  const { t } = useTranslation('common')

  const [isInProgram, setIsInProgram] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getIsInProgram = async () => {
      let isInProgram = sessionStorage.getItem('isInProgram')
      if (isInProgram) {
        setIsInProgram(JSON.parse(isInProgram))
        setLoading(false)
        console.log('isInProgram loaded from local storage', isInProgram)
      } else {
        isInProgram = await userIsInProgram()
        setIsInProgram(isInProgram)
        sessionStorage.setItem('isInProgram', JSON.stringify(isInProgram))
        setLoading(false)
      }
    }
    getIsInProgram()
  }, [])

  if (loading) {
    return (
      <Skeleton className="mx-auto mt-2 max-w-96 w-full p-2 flex flex-col items-center rounded-2xl">
        <div className="mx-auto mt-2 max-w-96 w-full bg-[#151A31] border-2 border-[#666F9A] p-2 flex flex-col items-center rounded-2xl"></div>
      </Skeleton>
    )
  }

  if (!isInProgram) {
    return null
  }

  return (
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      href="/vape"
      className="mx-auto mt-2 max-w-96 w-full bg-[#151A31] border-2 border-[#666F9A] p-2 flex flex-col justify-center rounded-2xl"
    >
      <div className="w-full flex justify-between">
        <h4 className="font-bold text-white text-lg">{t('stopVapingBanner_title')}</h4>
        <IconArrowAutofitRight />
      </div>
      <p className="text-white text-sm text-left">{t('stopVapingBanner_description')}</p>
    </motion.a>
  )
}

export default StopVapingBanner
