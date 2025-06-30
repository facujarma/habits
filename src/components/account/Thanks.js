'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'

function Thanks() {
    const { t } = useTranslation('common')
    const days = 123 // Podés reemplazar esto por un cálculo real si lo necesitás

    return (
        <div className='w-full my-6'>
            <h2 className='text-2xl'>
                {t('thank_you_title')}
            </h2>
            <p className='text-[#C5C5C5] mt-4'>
                {t('thank_you_message', { count: days })}
            </p>
        </div>
    )
}

export default Thanks
