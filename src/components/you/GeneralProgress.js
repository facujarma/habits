'use client'

import { getTotalCompletitonsInLast10Weeks } from '@root/utils/you'
import React, { useEffect, useState } from 'react'
import BarGraphic from './BarGraphic'
import { Skeleton } from '@heroui/skeleton'
import { useTranslation } from 'react-i18next'

function GeneralProgress() {
    const { t } = useTranslation('common')

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            const weeks = await getTotalCompletitonsInLast10Weeks()

            const reversedWeeks = weeks.reverse()
            setData(
                reversedWeeks.map((w) => ({
                    name: `Week ${9 - w.week}`,
                    value: w.count,
                }))
            )
            setIsLoading(false)
        }

        loadData()
    }, [])

    return (
        <div className="w-full min-w-full rounded-2xl mt-6">
            <h2 className="text-2xl text-[#C5C5C5] mb-4">{t('general_progress_title')}</h2>
            {!isLoading ? (
                <BarGraphic data={data} />
            ) : (
                <Skeleton className="w-full aspect-video rounded-2xl" />
            )}
        </div>
    )
}

export default GeneralProgress
