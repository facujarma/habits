'use client'

import React from 'react'
import { usePuff } from '@root/context/puffContext'
import { Spinner } from '@heroui/spinner'
import { useTranslation } from 'react-i18next'

function PuffTodayCounting() {
    const { loading, puffCounter } = usePuff()
    const { t } = useTranslation('common')

    if (loading) {
        return (
            <div className='flex flex-col gap-2 w-full items-center mt-12'>
                <h2 className='font-bold text-[#C5C5C5] text-3xl mb-4'>{t('today_puffs_title')}</h2>
                <Spinner />
            </div>
        )
    }

    const nicotine = (puffCounter || 0) * 0.2

    return (
        <div className='flex flex-col gap-2 w-full items-center mt-12'>
            <h2 className='font-bold text-[#C5C5C5] text-3xl'>{t('today_puffs_title')}</h2>
            <span className='font-bold text-white text-6xl'>{puffCounter || 0}</span>

            <div className='w-fit bg-[#151A31] border border-[#666F9A] rounded-full px-3 py-1'>
                <span className="text-[#BEBEBE] text-sm">
                    {t('nicotine_amount_text', { amount: nicotine.toFixed(2) })}
                </span>
            </div>
        </div>
    )
}

export default PuffTodayCounting
