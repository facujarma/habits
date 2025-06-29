import { getDailyChallenges } from '@root/utils/challenges'
import React, { useEffect, useState } from 'react'
import ChallengeCard from './ChallengeCard'
import { Skeleton } from '@heroui/skeleton'
import { useTranslation } from 'react-i18next'

function ChallengesList() {
    const { t } = useTranslation('common')
    const [timeLeft, setTimeLeft] = useState('')
    const [todayChallenges, setTodayChallenges] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const update = () => {
            const now = new Date()
            const endOfDay = new Date()
            endOfDay.setHours(23, 59, 59, 999)

            const diff = endOfDay.getTime() - now.getTime()

            const hours = Math.floor(diff / (1000 * 60 * 60))
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((diff % (1000 * 60)) / 1000)

            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`)
        }

        update() // update on mount
        const interval = setInterval(update, 1000) // update every second

        return () => clearInterval(interval) // cleanup on unmount
    }, [])

    useEffect(() => {
        const loadChallenges = async () => {
            const data = await getDailyChallenges()
            console.log(data)
            setTodayChallenges(data)
            setLoading(false)
        }

        loadChallenges()
    }, [])

    return (
        <ul>
            <h2 className="font-bold text-[#C5C5C5] text-2xl mb-4">{t('challengesList_title')}</h2>

            <span className="text-sm text-[#C5C5C5] block mb-2">
                {t('challengesList_timeLeftLabel')} {timeLeft}
            </span>

            {loading ? (
                <div className="w-full flex flex-col items-center gap-6">
                    <Skeleton className="w-full rounded-xl h-20" />
                    <Skeleton className="w-full rounded-xl h-20" />
                    <Skeleton className="w-full rounded-xl h-20" />
                </div>
            ) : (
                <ul className="flex flex-col gap-4">
                    {todayChallenges.map((challenge, i) => (
                        <ChallengeCard key={i} challenge={challenge} />
                    ))}
                </ul>
            )}
        </ul>
    )
}

export default ChallengesList
