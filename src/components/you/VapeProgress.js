'use client'

import React, { useEffect, useState } from 'react'
import BarGraphic from './BarGraphic'
import { Skeleton } from '@heroui/skeleton'
import { getVapeCountersForLast10Weeks } from '@root/utils/vape'

function VapeProgress() {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            const values = await getVapeCountersForLast10Weeks()
            const data = values.map((v, i) => ({ name: "Week " + i + "", value: v == -1 ? 0 : v }))
            setData(data)
            setIsLoading(false)
        }

        loadData()
    }, [])

    return (
        <div className="w-full min-w-full rounded-2xl mt-6">
            <h2 className="text-2xl text-[#C5C5C5] mb-4">Your puffs per week</h2>
            {
                !isLoading ?
                    <BarGraphic data={data} />
                    :
                    <Skeleton className="w-full aspect-video rounded-2xl" />
            }
        </div>
    )
}

export default VapeProgress
