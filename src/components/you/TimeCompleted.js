'use client'

import { getTimesOfCompletitions } from '@root/utils/you';
import React, { useEffect, useState } from 'react'
import BarGraphic from './BarGraphic';
import { Skeleton } from '@heroui/skeleton';

function TimeCompleted() {

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
            <h2 className="text-2xl text-[#C5C5C5] mb-4">Your completitions by hour</h2>
            {
                !isLoading ?
                    <BarGraphic data={times} />
                    :
                    <Skeleton className="w-full aspect-square rounded-2xl" />
            }
        </div>
    )
}

export default TimeCompleted