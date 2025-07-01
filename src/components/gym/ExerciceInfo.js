'use client'

import { getExerciceProgressData } from '@root/utils/gym'
import React, { useEffect, useState } from 'react'
import BarGraphic from '../you/BarGraphic'
import { addToast } from '@heroui/toast'
import { redirect } from 'next/navigation'
import GraphicTypeSelector from './GraphicTypeSelector'
import ExerciceStats from './ExerciceStats'
import { useTranslation } from 'react-i18next'

function ExerciceInfo({ exerciceID }) {
    const { t } = useTranslation('common')

    const [exerciceData, setExerciceData] = useState([])
    const [graphicType, setGraphicType] = useState("maxWeight")
    const [loading, setLoading] = useState(true)

    const renderMaxWeight = () => {
        const data = []
        exerciceData.forEach((session, index) => {
            let maxWeight = 0
            session.sets.forEach(series => {
                if (series.weight > maxWeight) maxWeight = series.weight
            })
            data.push({ name: `${t('session')} ${index + 1}`, value: maxWeight })
        })
        return data
    }

    const renderTotalReps = () => {
        const data = []
        exerciceData.forEach((session, index) => {
            let totalReps = 0
            session.sets.forEach(series => {
                totalReps += series.reps
            })
            data.push({ name: `${t('session')} ${index + 1}`, value: totalReps })
        })
        return data
    }

    function calculate1RM(peso, reps, rir) {
        const factor = 0.0333;
        const repsTotales = reps + rir;
        const estimado = peso * (1 + repsTotales * factor);
        return Math.round(estimado * 10) / 10;
    }

    function calculateVolume(peso, reps, rir) {
        return peso * reps * rir
    }

    const renderVolume = () => {
        const data = []
        exerciceData.forEach((session, index) => {
            let totalVolume = 0
            session.sets.forEach(series => {
                totalVolume += calculateVolume(series.weight, series.reps, series.rir)
            })
            data.push({ name: `${t('session')} ${index + 1}`, value: totalVolume })
        })
        return data
    }

    const renderMaxOne = () => {
        const data = []
        exerciceData.forEach((session, index) => {
            let maxOne = 0
            session.sets.forEach(series => {
                const oneRM = calculate1RM(series.weight, series.reps, series.rir)
                if (oneRM > maxOne) maxOne = oneRM
            })
            data.push({ name: `${t('session')} ${index + 1}`, value: maxOne })
        })
        return data
    }

    useEffect(() => {
        const loadInfo = async () => {
            try {
                const data = await getExerciceProgressData(exerciceID)
                setExerciceData(data)
            }
            catch (error) {
                addToast({ title: t('error'), description: t('error_loading_exercice_info'), color: "danger", timeout: 2000 })
                redirect('/gym')
            }
            finally {
                setLoading(false)
            }
        }
        loadInfo()
    }, [exerciceID, t])

    if (loading) return <div>{t('loading')}</div>

    return (
        <div>
            <h2 className='text-2xl my-4 text-[#C5C5C5]'>{t('graphics')}</h2>
            <GraphicTypeSelector setGraphicType={setGraphicType} graphicType={graphicType} />
            <BarGraphic data={
                graphicType === "maxWeight" ?
                    renderMaxWeight() :
                    graphicType === "totalReps" ?
                        renderTotalReps() :
                        graphicType === "maxOneRep" ?
                            renderMaxOne() :
                            renderVolume()
            } />
            <ExerciceStats exerciceData={exerciceData} />
        </div>
    )
}

export default ExerciceInfo
