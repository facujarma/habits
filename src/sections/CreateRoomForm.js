'use client'

import Input from '@components/Input'
import React, { useState } from 'react'
import CreateNewHabitFirstStep from '@components/CreateNewHabitFirstStep'
import CreateNewhabitSecondStep from '@components/CreateNewhabitSecondStep'
import CreateNewHabitThirdStep from '@components/CreateNewHabitThirdStep'
import SeparatorLine from '@components/SeparatorLine'
import CreateNewHabitFourthStep from '@components/CreateNewHabitFourthStep'
import CreateNewHabitFifthStep from '@components/CreateNewHabitFifthStep'
import Button from '@components/Button'
import { IconCirclePlus } from '@tabler/icons-react'
import { createNewRoom } from '@lib/rooms'
import { addToast } from '@heroui/toast'
import { useRooms } from '@root/context/roomsContext'
import { Checkbox } from '@heroui/react'
import { useTranslation } from 'react-i18next'

function CreateRoomForm() {
    const { t } = useTranslation('common')
    const { fetchRooms } = useRooms()

    const [roomName, setName] = useState('')
    const [roomDesc, setDesc] = useState('')
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
    const [isPublic, setIsPublic] = useState(false)
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

        const roomInfo = {
            name: roomName,
            description: roomDesc,
            public: isPublic,
        }
        const promise = createNewRoom(roomInfo, habit)

        addToast({
            title: t('create_new_room'),
            description: t('creating_room_please_wait'),
            promise,
            timeout: 2000,
        })

        try {
            await promise
            await fetchRooms(true)
            addToast({
                title: t('create_new_room'),
                description: t('room_created_successfully'),
                color: 'success',
                timeout: 2000,
            })
        } catch (e) {
            addToast({
                title: t('error_creating_room'),
                description: '',
                color: 'danger',
                timeout: 2000,
            })
            console.error(e)
        }
    }

    return (
        <div className="w-full">
            <Input label={t('name_label')} placeholder={t('name_placeholder')} setText={setName} />
            <Input label={t('description_label')} placeholder={t('description_placeholder')} setText={setDesc} />
            <Checkbox isSelected={isPublic} onValueChange={setIsPublic}>
                {t('is_public_label')}
            </Checkbox>
            <p className="text-base text-[#C5C5C5] my-10">{t('rooms_info_text')}</p>

            <CreateNewHabitFirstStep plural={true} colorSet={habitColor} habitDescriptiveInfo={habitDescriptiveInfo} setHabitDescriptiveInfo={setHabitDescriptiveInfo} />
            <SeparatorLine />
            <CreateNewhabitSecondStep setHabitDays={setHabitDays} habitDays={habitDays} />
            <SeparatorLine />
            <CreateNewHabitThirdStep setHabitTimes={setHabitTimes} habitTimes={habitTimes} />
            <SeparatorLine />
            <CreateNewHabitFourthStep color={habitColor} setColor={setHabitColor} />
            <CreateNewHabitFifthStep onSelect={setHabitIcon} />

            <Button icon={<IconCirclePlus />} text={t('create_button_text')} handleClick={handleCreate} />
        </div>
    )
}

export default CreateRoomForm
