'use client'

import { getTotalChallengesCompletitonsInLast10Weeks } from '@root/utils/you'
import React, { useEffect, useState } from 'react'
import BarGraphic from './BarGraphic'
import { Skeleton } from '@heroui/skeleton'
import { useTranslation } from 'react-i18next'

function ChallengesCompleted() {
    const { t } = useTranslation('common')

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            const weeks = await getTotalChallengesCompletitonsInLast10Weeks()
            const reversedWeeks = weeks.reverse()
            setData(
                reversedWeeks.map((w) => ({
                    name: `Week ${9 - w.week}`,
                    value: w.count,
                }))
            )
            setLoading(false)
        }

        loadData()
    }, [])

    return (
        <div className="w-full min-w-full rounded-2xl mt-6">
            <h2 className="text-2xl text-[#C5C5C5] mb-4">{t('challenges_completed_title')}</h2>
            {!loading ? (
                <BarGraphic data={data} />
            ) : (
                <Skeleton className="w-full aspect-video rounded-2xl" />
            )}
        </div>
    )
}

export default ChallengesCompleted
