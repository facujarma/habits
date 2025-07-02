import React, { useEffect, useState } from 'react'
import BarGraphic from './BarGraphic'
import { Skeleton } from '@heroui/skeleton'
import { useTranslation } from 'react-i18next'
import { getTotalBooksReadedPerMonth } from '@root/utils/you'

function ReadedBooks() {
    const { t } = useTranslation('common')

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            const months = await getTotalBooksReadedPerMonth()
            const reversedMonths = months.reverse()
            setData(
                reversedMonths.map((w) => ({
                    name: `Month ${12 - w.month}`,
                    value: w.count,
                }))
            )
            setLoading(false)
        }

        loadData()
    }, [])

    return (
        <div className="w-full min-w-full rounded-2xl mt-6">
            <h2 className="text-2xl text-[#C5C5C5] mb-4">{t('challenges_readed_books')}</h2>
            {!loading ? (
                <BarGraphic data={data} />
            ) : (
                <Skeleton className="w-full aspect-video rounded-2xl" />
            )}
        </div>
    )
}

export default ReadedBooks