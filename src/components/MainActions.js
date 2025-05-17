'use client'

import ActionBox from "@components/ActionBox"
import SeparatorLine from "@components/SeparatorLine"
import { IconCirclePlus, IconSmoking } from "@tabler/icons-react"
import { redirect } from 'next/navigation'

function MainActions() {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-[#C5C5C5] text-lg ">What are you looking for?</h2>
            <div className="flex gap-6 overflow-x-auto max-w-full xl:justify-center  py-4">
                <ActionBox
                handleClick={() => {
                    redirect("/habits/createHabit")
                }}
                icon={<IconCirclePlus className="w-full h-full text-[#B3B3B3]" />} text={"Create a new habit"} />
                <ActionBox 
                handleClick={() => {
                    redirect("/vape/start")
                }}
                icon={<IconSmoking className="w-full h-full text-[#B3B3B3]" />} text={"Stop vaping"} />
                <ActionBox />
            </div>
            <SeparatorLine />
        </div>
    )
}

export default MainActions