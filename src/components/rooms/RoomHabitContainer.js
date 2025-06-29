'use client'

import React, { useState, useEffect } from 'react'
import { motion } from "motion/react"
import IconRenderer from '@components/IconRenderer'
import { hexToRgba } from '@lib/color'
import { addToast, Spinner } from "@heroui/react"
import { gethabitRoomStatus, markRoomHabitAsComplete, markRoomHabitAsIncomplete } from '@lib/rooms'
import { IconArrowBadgeRight, IconCheck } from '@tabler/icons-react'
import RoomHabitMadeBy from './RoomHabitMadeBy'
import { redirect } from 'next/navigation'
import { useTranslation } from 'react-i18next'

function RoomHabitContainer({ habit }) {
    const { t } = useTranslation('common')

    const { name, personToBe, icon: habitIcon, color } = habit

    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState(false)

    useEffect(() => {
        const fetchHabits = async () => {
            setLoading(true)
            try {
                const status = await gethabitRoomStatus(habit.id)
                setStatus(status)
            } catch (error) {
                addToast({
                    title: "Error",
                    description: t('roomHabitContainer_error_getHabit'),
                    color: "danger",
                    timeout: 2000
                })
                console.log(error)
            }
            setLoading(false)
        }
        fetchHabits()
    }, [habit.id, t])

    const handleClick = async () => {
        setLoading(true)

        if (status) {
            try {
                await markRoomHabitAsIncomplete(habit.id)
                setStatus(false)
            } catch (error) {
                addToast({
                    title: "Error",
                    description: t('roomHabitContainer_error_markIncomplete'),
                    color: "danger",
                    timeout: 2000
                })
                console.log(error)
            }
        } else {
            try {
                await markRoomHabitAsComplete(habit.id)
                setStatus(true)
            } catch (error) {
                addToast({
                    title: "Error",
                    description: t('roomHabitContainer_error_markComplete'),
                    color: "danger",
                    timeout: 2000
                })
                console.log(error)
            }
        }
        setLoading(false)
    }

    const backgroundColor = hexToRgba(color, 0.37)

    return (
        <div className='w-full flex flex-col gap-2'>
            <div className="w-full h-24 flex items-center gap-6 ">
                {loading ? (
                    <Spinner color="primary" />
                ) : (
                    <button className="w-10 aspect-square bg-[#242424] border border-[#616161] rounded-full text-white flex items-center justify-center">
                        {status && <IconCheck size={32} />}
                    </button>
                )}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.4,
                        scale: { type: "spring", bounce: 0.5 },
                    }}
                    className={`flex items-center min-h-24 h-full w-full border rounded-xl cursor-pointer ${!status && "bg-[#242424] border-[#616161]"}`}
                    style={status ? { backgroundColor, borderColor: color } : undefined}
                >
                    <IconRenderer iconName={habitIcon} color={"white"} />
                    <button className="w-full flex flex-col p-3 items-start" onClick={handleClick}>
                        <h3 className="text-start text-2xl font-bold text-[#C5C5C5]">{name}</h3>
                        <span className="text-base text-[#C5C5C5] text-start"> {personToBe} </span>
                    </button>
                    <button
                        onClick={() => redirect(`rooms/habit/${habit.id}`)}
                        className='w-14 h-full border-l border-[#616161] rounded-r-xl bg-[#242424] flex items-center justify-center'
                    >
                        <IconArrowBadgeRight size={32} />
                    </button>
                </motion.div>
            </div>
            <RoomHabitMadeBy habitID={habit.id} />
        </div>
    )
}

export default RoomHabitContainer
