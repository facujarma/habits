'use client'

import React, { useState } from 'react'
import CreateNewNegativeFirstStep from '@root/components/CreateNewNegativeFirstStep'
import Header from '@root/sections/Header'
import SeparatorLine from '@root/components/SeparatorLine'
import CreateNewHabitFourthStep from '@root/components/CreateNewHabitFourthStep'
import Button from '@root/components/Button'
import { IconCirclePlus } from '@tabler/icons-react'
import { addNegativeHabit } from '@root/utils/negativeHabit'
import { addToast } from '@heroui/toast'
function page() {

    const [habitDescriptiveInfo, setHabitDescriptiveInfo] = useState({
        badHabit: "",
        goodHabit: ""
    })
    const [color, setColor] = useState(new Set(["#668C9A"]))

    const handleCreateNegative = async (e) => {
        e.preventDefault();
        const promise = addNegativeHabit({
            badHabit: habitDescriptiveInfo.badHabit,
            goodHabit: habitDescriptiveInfo.goodHabit,
            color: Array.from(color)[0]
        });

        addToast({
            title: "Create a new negative",
            description: "Please wait while the negative habit is being created.",
            promise,
            timeout: 2000
        });

        try {
            await promise;
            addToast({
                title: "Negative created",
                description: "The negative habit has been created successfully.",
                color: "success",
                timeout: 2000
            })
        } catch (e) {
            addToast({
                title: "Error",
                description: "There was an error creating the negative habit.",
                color: "danger",
                timeout: 2000
            })

        }
    }

    return (
        <div className="w-full h-full mb-10">
            <Header title={"Create a new negative"} text={"An effective way to break a bad habit is by replacing it with a good one, which is why we suggest you complete this sentence:"} />
            <CreateNewNegativeFirstStep habitDescriptiveInfo={habitDescriptiveInfo} setHabitDescriptiveInfo={setHabitDescriptiveInfo} colorSet={color} />
            <SeparatorLine />
            <div className="w-full flex flex-col gap-4 py-6">
                <h2 className="text-[#C5C5C5] text-xl ">Frequency:</h2>
                <p className='text-[#C5C5C5] text-base'>The frequency of negative habits is set <b>to daily by default</b>, as we believe that one doesn’t choose when to engage in a bad habit.</p>
            </div>
            <SeparatorLine />
            <CreateNewHabitFourthStep color={color} setColor={setColor} />
            <Button icon={<IconCirclePlus />} text={"Create"} handleClick={(e) => handleCreateNegative(e)} />
        </div>
    )
}

export default page