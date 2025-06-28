'use client'

import { getExerciceProgressData } from '@root/utils/gym'
import React, { useEffect, useState } from 'react'
import BarGraphic from '../you/BarGraphic'
import { addToast } from '@heroui/toast'
import { redirect } from 'next/navigation'
import GraphicTypeSelector from './GraphicTypeSelector'
import ExerciceStats from './ExerciceStats'

function ExerciceInfo({ exerciceID }) {

    const [exerciceData, setExerciceData] = useState({})
    const [graphicType, setGraphicType] = useState("maxWeight")

    const [loading, setLoading] = useState(true)
    const renderMaxWeight = () => {
        const data = []
        exerciceData.forEach((session, index) => {
            let maxWeight = 0
            session.sets.forEach(series => {
                if (series.weight > maxWeight) maxWeight = series.weight
            })
            data.push({ name: `Session ${index + 1}`, value: maxWeight })
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
            data.push({ name: `Session ${index + 1}`, value: totalReps })
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
            data.push({ name: `Session ${index + 1}`, value: totalVolume })
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
            data.push({ name: `Session ${index + 1}`, value: maxOne })
        })
        return data
    }

    useEffect(() => {
        const loadInfo = async () => {
            try {
                const data = await getExerciceProgressData(exerciceID)
                console.log(data)
                setExerciceData(data)
            }
            catch (error) {
                addToast({ title: "Error", description: "Error loading exercice info", color: "danger", timeout: 2000 })
                redirect('/gym')
            }
            finally {
                setLoading(false)
            }
        }
        loadInfo()
    }, [])

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <h2 className='text-2xl my-4 text-[#C5C5C5]'>Grapchics</h2>
            <GraphicTypeSelector setGraphicType={setGraphicType} graphicType={graphicType} />
            <BarGraphic data={
                graphicType == "maxWeight" ?
                    renderMaxWeight() :
                    graphicType == "totalReps" ?
                        renderTotalReps() :
                        graphicType == "maxOneRep" ?
                            renderMaxOne() :
                            renderVolume()
            } />
            <ExerciceStats exerciceData={exerciceData} />
        </div>
    )
}

export default ExerciceInfo