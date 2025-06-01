'use client'

import ActionBox from "@components/ActionBox"
import { IconCirclePlus, IconQuote, IconSmoking } from "@tabler/icons-react"
import { redirect } from 'next/navigation'

function MainActions() {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-[#C5C5C5] text-lg">What are you looking for?</h2>
            <div className="flex gap-6 overflow-x-auto max-w-full xl:justify-center py-2">
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
                <ActionBox
                    handleClick={() => {
                        redirect("/quotes")
                    }}
                    icon={<IconQuote className="w-full h-full text-[#B3B3B3]" />}
                    text={"Get a quote"}
                />
            </div>
        </div>
    )
}

export default MainActions