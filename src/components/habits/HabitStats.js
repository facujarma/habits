import React from 'react'
import { useTranslation } from 'react-i18next'

function HabitStats({ maxStreak, totalCompletitions, completionPercentage }) {
  const { t } = useTranslation('common')

  return (
    <div className="w-full h-full flex gap-4 ">
      <div className="w-full max-h-full aspect-square bg-[#242424] border border-[#616161] rounded-2xl flex flex-col items-center">
        <p className='text-base text-[#B3B3B3] text-center w-full py-1 text-wrap'>
          {t('habitStats_longestStreak')}
        </p>
        <span className='text-5xl text-white flex-1 flex items-center'> {maxStreak} </span>
        <p className='text-base text-[#B3B3B3] text-center w-full py-1'>{t('habitStats_days')}</p>
      </div>
      <div className="w-full max-h-full aspect-square bg-[#242424] border border-[#616161] rounded-2xl flex flex-col items-center">
        <p className='text-base text-[#B3B3B3] text-center w-full py-1 text-wrap'>
          {t('habitStats_totalCompletions')}
        </p>
        <span className='text-5xl text-white flex-1 flex items-center'> {totalCompletitions} </span>
        <p className='text-base text-[#B3B3B3] text-center w-full py-1'>{t('habitStats_times')}</p>
      </div>
      <div className="w-full max-h-full aspect-square bg-[#242424] border border-[#616161] rounded-2xl flex flex-col items-center">
        <p className='text-base text-[#B3B3B3] text-center w-full py-1 text-wrap'>
          {t('habitStats_completion')}
        </p>
        <span className='text-5xl text-white flex-1 flex items-center'> {completionPercentage} </span>
        <p className='text-base text-[#B3B3B3] text-center w-full py-1'>{t('habitStats_percent')}</p>
      </div>
    </div>
  )
}

export default HabitStats
