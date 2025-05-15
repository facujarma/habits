'use client'

import { useState, useEffect } from 'react'
import { getHabitFullData } from '@root/utils/habits'
import { Spinner } from '@heroui/spinner'
import HabitInfoTitle from './HabitInfoTitle'
import { addToast } from '@heroui/toast'

export default function HabitsAllInfo( { habitID } ) {
    const [habitInfo, setHabitInfo] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchHabitInfo() {
            setLoading(true)
            try {
                const data = await getHabitFullData(habitID)
                setHabitInfo(data)
                console.log(data)
            } catch (err) {
                addToast({
                    title: 'Error',
                    message: "No se puso obtener la información del hábito.",
                    type: 'danger',
                })
            } finally {
                setLoading(false)
            }
        }

        fetchHabitInfo()
    }, [])

    if (loading) return <Spinner color="primary" />
    return (
        <div className="grid gap-4">
            <HabitInfoTitle title={habitInfo.name} />
        </div>
    )
}
