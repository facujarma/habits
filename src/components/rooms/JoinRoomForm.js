'use client'

import { addToast, Select } from '@heroui/react'
import { SelectItem } from '@heroui/select'
import React, { useState } from 'react'
import Button from '../Button'
import { IconUsersPlus } from '@tabler/icons-react'
import { addUserToRoomByInvitationCode } from '@root/utils/rooms'

function JoinRoomForm({ token }) {

    const [experience, setExperience] = useState()

    const handleJoin = async () => {
        const exp = Array.from(experience)[0]
        if (!exp) {
            addToast({ title: "Error", description: "Please select an option", color: "danger", timeout: 2000 });
        }
        try {
            const res = await addUserToRoomByInvitationCode(token, exp)
            addToast({ title: "Room joined", description: "You have joined the room successfully", color: "success", timeout: 2000 });
        }
        catch (e) {
            addToast({ title: "Error", description: "There was an error joining the room", color: "danger", timeout: 2000 });
        }
    }

    return (
        <div>
            <span className='text-[#C5C5C5]'>Room: {token}</span>
            <h2 className='text-xl my-4'>
                What option best suits you?
            </h2>
            <Select placeholder='Select an option' onSelectionChange={setExperience}>
                <SelectItem key={"newbie"}>
                    I'm a newbie
                </SelectItem>
                <SelectItem key={"beginner"}>
                    I'm a beginner
                </SelectItem>
                <SelectItem key={"intermediate"}>
                    I'm a intermediate
                </SelectItem>
                <SelectItem key={"advanced"}>
                    I'm an advanced
                </SelectItem>
                <SelectItem key={"expert"}>
                    I'm an expert
                </SelectItem>
            </Select>
            <div className='my-4'>
                <Button text={'Join'} icon={<IconUsersPlus />} handleClick={handleJoin} />
            </div>
        </div>
    )
}

export default JoinRoomForm