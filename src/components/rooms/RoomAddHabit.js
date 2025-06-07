'use client'

import React, { useState } from 'react'
import CreateNewHabitFirstStep from '@root/components/CreateNewHabitFirstStep'
import CreateNewhabitSecondStep from '@root/components/CreateNewhabitSecondStep'
import CreateNewHabitThirdStep from '@root/components/CreateNewHabitThirdStep'
import SeparatorLine from '@root/components/SeparatorLine'
import CreateNewHabitFourthStep from '@root/components/CreateNewHabitFourthStep'
import CreateNewHabitFifthStep from '@root/components/CreateNewHabitFifthStep'
import Button from '@root/components/Button'
import { IconCirclePlus } from '@tabler/icons-react'
import { addHabitToRoom } from '@lib/rooms'
import { addToast } from '@heroui/toast'
import { useRooms } from '@root/context/roomsContext'

function RoomAddHabit({ roomId }) {

    const { fetchRooms } = useRooms();

    const [habitDescriptiveInfo, setHabitDescriptiveInfo] = useState({
        name: '',
        when: '',
        personToBe: ''
    })
    const [habitDays, setHabitDays] = useState({
        M: false,
        Tu: false,
        W: false,
        Th: false,
        F: false,
        Sa: false,
        Su: false
    })
    const [habitTimes, setHabitTimes] = useState([])

    const [habitColor, setHabitColor] = useState(new Set(["#668C9A"]))
    const [habitIcon, setHabitIcon] = useState("")

    const handleCreate = async () => {
        const habit = {
            name: habitDescriptiveInfo.name,
            when: habitDescriptiveInfo.when,
            personToBe: habitDescriptiveInfo.personToBe,
            weekdays: habitDays,
            times: habitTimes,
            color: Array.from(habitColor)[0],
            icon: habitIcon
        }

        const promise = addHabitToRoom(habit, roomId);

        addToast({
            title: "Add a new habit",
            description: "Please wait while the habit is being created and added to the room.",
            promise,
            timeout: 2000
        });

        try {
            await promise;

            await fetchRooms(true);

            addToast({
                title: "Habit added",
                description: "The habit has been added to the room successfully.",
                color: "success",
                timeout: 2000
            });
        }
        catch (e) {
            addToast({
                title: "Error",
                description: "There was an error creating the habit.",
                color: "danger",
                timeout: 2000
            })
            console.log(e)
        }
    }

    return (
        <>
            <CreateNewHabitFirstStep plural={true} colorSet={habitColor} habitDescriptiveInfo={habitDescriptiveInfo} setHabitDescriptiveInfo={setHabitDescriptiveInfo} />
            <SeparatorLine />
            <CreateNewhabitSecondStep setHabitDays={setHabitDays} habitDays={habitDays} />
            <SeparatorLine />
            <CreateNewHabitThirdStep setHabitTimes={setHabitTimes} habitTimes={habitTimes} />
            <SeparatorLine />
            <CreateNewHabitFourthStep color={habitColor} setColor={setHabitColor} />
            <CreateNewHabitFifthStep onSelect={setHabitIcon} />

            <Button icon={<IconCirclePlus />} text={"Add"} handleClick={handleCreate} />
        </>
    )
}

export default RoomAddHabit