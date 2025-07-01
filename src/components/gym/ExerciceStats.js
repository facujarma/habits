'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'

function ExerciceStats({ exerciceData = [] }) {
    const { t } = useTranslation('common')

    const getMaxWeightRecord = () => {
        let maxWeight = 0
        exerciceData.forEach(session => {
            session.sets.forEach(set => {
                if (set.weight > maxWeight) maxWeight = set.weight
            })
        })
        return maxWeight
    }

    const getMaxRepsRecord = () => {
        let maxReps = 0
        exerciceData.forEach(session => {
            session.sets.forEach(set => {
                if (set.reps > maxReps) maxReps = set.reps
            })
        })
        return maxReps
    }

    const calculate1RM = (weight, reps, rir) => {
        const factor = 0.0333
        const repsTotal = reps + rir
        return weight * (1 + repsTotal * factor)
    }
    const getMax1RMRecord = () => {
        let max1RM = 0
        exerciceData.forEach(session => {
            session.sets.forEach(set => {
                const oneRM = calculate1RM(set.weight, set.reps, set.rir)
                if (oneRM > max1RM) max1RM = oneRM
            })
        })
        return Math.round(max1RM * 10) / 10
    }

    const calculateVolume = (weight, reps, rir) => weight * reps * rir
    const getMaxVolumeRecord = () => {
        let maxVolume = 0
        exerciceData.forEach(session => {
            let sessionVolume = 0
            session.sets.forEach(set => {
                sessionVolume += calculateVolume(set.weight, set.reps, set.rir)
            })
            if (sessionVolume > maxVolume) maxVolume = sessionVolume
        })
        return maxVolume
    }

    return (
        <div className='w-full my-6'>
            <h2 className='text-2xl text-[#C5C5C5]'>{t('general_stats')}</h2>
            <ul className="flex gap-4 my-4 text-[#C5C5C5] text-xl">
                <li>{t('weight_record')}: {getMaxWeightRecord()}</li>
                <li>{t('reps_record')}: {getMaxRepsRecord()}</li>
                <li>{t('one_rm_record')}: {getMax1RMRecord()}</li>
                <li>{t('volume_record')}: {getMaxVolumeRecord()}</li>
            </ul>
        </div>
    )
}

export default ExerciceStats
