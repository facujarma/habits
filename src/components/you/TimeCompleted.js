'use client'

import { getTimesOfCompletitions } from '@root/utils/you';
import React, { useEffect, useState } from 'react'
import BarGraphic from './BarGraphic';
import { Skeleton } from '@heroui/skeleton';
import { useTranslation } from 'react-i18next'

function TimeCompleted() {
    const { t } = useTranslation('common')

    const [times, setTimes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTimes = async () => {
            const times = await getTimesOfCompletitions();
            const result = Object.entries(times).map(([key, value]) => ({
                name: key,
                value: value
            }))

            setTimes(result);
            setIsLoading(false);
        }
        loadTimes();
    }, [])

    return (
        <div className="w-full min-w-full rounded-2xl mt-6">
            <h2 className="text-2xl text-[#C5C5C5] mb-4">{t('time_completed_title')}</h2>
            {
                !isLoading ?
                    <BarGraphic data={times} />
                    :
                    <Skeleton className="w-full aspect-video rounded-2xl" />
            }
        </div>
    )
}

export default TimeCompleted
