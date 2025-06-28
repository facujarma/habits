import DangerZone from '@root/components/account/DangerZone'
import ShareStats from '@root/components/account/ShareStats'
import Thanks from '@root/components/account/Thanks'
import SeparatorLine from '@root/components/SeparatorLine'
import Header from '@root/sections/Header'
import { IconArrowRight } from '@tabler/icons-react'
import React from 'react'

function page() {
    return (
        <div className='w-full h-full'>
            <Header title="Account" text="Here you can view the information we’ve gathered about you, and access your account settings." />
            <h2 className="text-[#C5C5C5] text-2xl mt-4">Your information</h2>
            <ShareStats />
            <SeparatorLine />
            <a className="mt-6 w-full h-12 bg-[#242424] rounded-2xl flex items-center justify-center gap-2">
                Go to general settings <IconArrowRight />
            </a>
            <Thanks />
            <SeparatorLine />
            <DangerZone />
        </div>
    )
}

export default page