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
function CreateRoomForm() {

    const { fetchRooms } = useRooms()

    const [roomName, setName] = useState('')
    const [roomDesc, setDesc] = useState('')
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
    const [isPublic, setIsPublic] = useState(false)
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

        const roomInfo = {
            name: roomName,
            description: roomDesc,
            public: isPublic
        }
        const promise = createNewRoom(roomInfo, habit);

        addToast({
            title: "Create a new room",
            description: "Please wait while the room is being created.",
            promise,
            timeout: 2000
        });

        try {
            await promise;
            await fetchRooms(true);
            addToast({
                title: "Room created",
                description: "The room has been created successfully.",
                color: "success",
                timeout: 2000
            })
        } catch (e) {
            addToast({
                title: "Error",
                description: "There was an error creating the room.",
                color: "danger",
                timeout: 2000
            })
            console.log(e)
        }
    }

    return (
        <div className='w-full'>
            <Input label="Name" placeholder="Gymbros" setText={setName} />
            <Input label="Description" placeholder="Talk more about the room" setText={setDesc} />
            <Checkbox isSelected={isPublic} onValueChange={setIsPublic}>
                Is the rooms public?
            </Checkbox>
            <p className='text-base text-[#C5C5C5] my-10'>
                Rooms are spaces where habits are shared among people. Complete the information for the habit you want to do as a group (you’ll be able to add more later).
            </p>

            <CreateNewHabitFirstStep plural={true} colorSet={habitColor} habitDescriptiveInfo={habitDescriptiveInfo} setHabitDescriptiveInfo={setHabitDescriptiveInfo} />
            <SeparatorLine />
            <CreateNewhabitSecondStep setHabitDays={setHabitDays} habitDays={habitDays} />
            <SeparatorLine />
            <CreateNewHabitThirdStep setHabitTimes={setHabitTimes} habitTimes={habitTimes} />
            <SeparatorLine />
            <CreateNewHabitFourthStep color={habitColor} setColor={setHabitColor} />
            <CreateNewHabitFifthStep onSelect={setHabitIcon} />

            <Button icon={<IconCirclePlus />} text={"Create"} handleClick={handleCreate} />
        </div>
    )
}

export default CreateRoomForm