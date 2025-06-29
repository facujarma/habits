'use client'

import { addToast } from '@heroui/toast'
import { getVApeCounterForWeek, getVapeCountersForLast10Weeks } from '@lib/vape'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function VapeMessage() {
    const { t } = useTranslation('common')
    const [loading, setLoading] = useState(true)
    const [weekPuffs, setWeekPuffs] = useState(0)
    const [past10WeeksPuffs, setPast10WeeksPuffs] = useState([])

    useEffect(() => {
        async function loadWeekPuffs() {
            try {
                const totalWeekPuffs = await getVApeCounterForWeek()
                setWeekPuffs(totalWeekPuffs)
            } catch (error) {
                addToast({
                    title: t('error_title', 'Error'),
                    description: t('error_loading_week_puffs', 'Error loading week puffs'),
                    color: 'danger',
                    timeout: 2000
                })
                console.error(error)
            }
        }

        async function loadPast10WeeksPuff() {
            try {
                const totalPast10WeeksPuffs = await getVapeCountersForLast10Weeks()
                setPast10WeeksPuffs(totalPast10WeeksPuffs)
                setLoading(false)
            } catch (error) {
                addToast({
                    title: t('error_title', 'Error'),
                    description: t('error_loading_past_weeks_puffs', 'Error loading past weeks puffs'),
                    color: 'danger',
                    timeout: 2000
                })
            }
        }
        loadWeekPuffs()
        loadPast10WeeksPuff()
    }, [t])

    let thisWeekBeats = 0
    past10WeeksPuffs.forEach((week) => {
        if (week > weekPuffs || week === -1) {
            thisWeekBeats++
        }
    })

    const thisWeekBeatsPercentage = (thisWeekBeats / 10) * 100

    function getEncouragementMessage(percentage) {
        if (percentage === 100) return t('encouragement_best_week')
        if (percentage >= 90) return t('encouragement_almost_best_week')
        if (percentage >= 80) return t('encouragement_crushing_it')
        if (percentage >= 70) return t('encouragement_real_progress')
        if (percentage >= 60) return t('encouragement_momentum_building')
        if (percentage >= 50) return t('encouragement_half_beaten')
        if (percentage >= 40) return t('encouragement_almost_halfway')
        if (percentage >= 30) return t('encouragement_getting_there')
        if (percentage >= 20) return t('encouragement_every_step')
        if (percentage >= 10) return t('encouragement_progress_small')
        return t('encouragement_keep_going')
    }

    if (loading) {
        return (
            <div className="flex flex-col gap-4 w-full items-center mt-6">
                <h4 className="font-bold text-[#C5C5C5] text-lg">{t('wait_a_moment')}</h4>
                <div className="w-fit bg-[#151A31] border border-[#666F9A] rounded-full px-3 py-1">
                    <span className="text-[#BEBEBE] text-sm">{t('better_than_percent', { percent: '---' })}</span>
                </div>
                <span className="text-[#C5C5C5] text-sm">-- {t('puff_on_week')}</span>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 w-full items-center mt-6">
            <h4 className="font-bold text-[#23B184] text-lg">{getEncouragementMessage(thisWeekBeatsPercentage)}</h4>
            <div className="w-fit bg-[#151A31] border border-[#666F9A] rounded-full px-3 py-1">
                <span className="text-[#BEBEBE] text-sm">{t('better_than_percent', { percent: thisWeekBeatsPercentage.toFixed(0) })}</span>
            </div>
            <span className="text-[#C5C5C5] text-sm">
                {weekPuffs} {weekPuffs === 1 ? t('puff_on_week') : t('puff_on_week_plural', { count: weekPuffs })}
            </span>
        </div>
    )
}

export default VapeMessage
