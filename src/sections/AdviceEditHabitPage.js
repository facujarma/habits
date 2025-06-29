import React from 'react'
import { useTranslation } from 'react-i18next'

function AdviceEditHabitPage({ advices }) {
    const { t } = useTranslation('common')

    return (
        <div>
            <h3 className='text-[#C5C5C5] text-xl mt-16 mb-4'>{t('adviceEditHabitPage_title')}</h3>
            <ul className='flex flex-col gap-4 pb-4'>
                {advices.map((advice) => (
                    <li key={advice.id} className='w-full bg-[#242424] border border-[#616161] rounded-2xl p-2'>
                        <h3 className='font-bold text-white text-base'>{advice.title}</h3>
                        <p className='text-sm'>{advice.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdviceEditHabitPage
