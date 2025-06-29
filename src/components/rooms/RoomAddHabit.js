'use client'

import React, { useState } from 'react'
import CreateNewHabitFirstStep from '@components/CreateNewHabitFirstStep'
import CreateNewhabitSecondStep from '@components/CreateNewhabitSecondStep'
import CreateNewHabitThirdStep from '@components/CreateNewHabitThirdStep'
import SeparatorLine from '@components/SeparatorLine'
import CreateNewHabitFourthStep from '@components/CreateNewHabitFourthStep'
import CreateNewHabitFifthStep from '@components/CreateNewHabitFifthStep'
import Button from '@components/Button'
import { IconCirclePlus } from '@tabler/icons-react'
import { addHabitToRoom } from '@lib/rooms'
import { addToast } from '@heroui/toast'
import { useRooms } from '@root/context/roomsContext'
import { useTranslation } from 'react-i18next'

function RoomAddHabit({ roomId }) {
    const { t } = useTranslation('common')
    const { fetchRooms } = useRooms()

    const [habitDescriptiveInfo, setHabitDescriptiveInfo] = useState({
        name: '',
        when: '',
        personToBe: '',
    })
    const [habitDays, setHabitDays] = useState({
        M: false,
        Tu: false,
        W: false,
        Th: false,
        F: false,
        Sa: false,
        Su: false,
    })
    const [habitTimes, setHabitTimes] = useState([])
    const [habitColor, setHabitColor] = useState(new Set(['#668C9A']))
    const [habitIcon, setHabitIcon] = useState('')

    const handleCreate = async () => {
        const habit = {
            name: habitDescriptiveInfo.name,
            when: habitDescriptiveInfo.when,
            personToBe: habitDescriptiveInfo.personToBe,
            weekdays: habitDays,
            times: habitTimes,
            color: Array.from(habitColor)[0],
            icon: habitIcon,
        }

        const promise = addHabitToRoom(habit, roomId)

        addToast({
            title: t('add_new_habit'),
            description: t('creating_habit_please_wait'),
            promise,
            timeout: 2000,
        })

        try {
            await promise
            await fetchRooms(true)
            addToast({
                title: t('add_new_habit'),
                description: t('habit_added_successfully'),
                color: 'success',
                timeout: 2000,
            })
        } catch (e) {
            addToast({
                title: t('error_creating_habit'),
                description: '',
                color: 'danger',
                timeout: 2000,
            })
            console.error(e)
        }
    }

    return (
        <>
            <CreateNewHabitFirstStep
                plural={true}
                colorSet={habitColor}
                habitDescriptiveInfo={habitDescriptiveInfo}
                setHabitDescriptiveInfo={setHabitDescriptiveInfo}
            />
            <SeparatorLine />
            <CreateNewhabitSecondStep setHabitDays={setHabitDays} habitDays={habitDays} />
            <SeparatorLine />
            <CreateNewHabitThirdStep setHabitTimes={setHabitTimes} habitTimes={habitTimes} />
            <SeparatorLine />
            <CreateNewHabitFourthStep color={habitColor} setColor={setHabitColor} />
            <CreateNewHabitFifthStep onSelect={setHabitIcon} />

            <Button icon={<IconCirclePlus />} text={t('add_button_text')} handleClick={handleCreate} />
        </>
    )
}

export default RoomAddHabit
