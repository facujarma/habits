import Carrousel from '@root/components/you/Carrousel'
import GeneralProgress from '@you/GeneralProgress'
import Header from '@sections/Header'
import React from 'react'
import VapeProgress from '@root/components/you/VapeProgress'
import JournalingWords from '@root/components/you/JournalingWords'
import TimeCompleted from '@root/components/you/TimeCompleted'
import Achivements from '@root/components/you/Achivements'

function page() {
    return (
        <div>
            <Header title="You" text={"This is your space. Here, we show your account information and the stats on how your progress with Habits. has evolved."} />
            <Carrousel >
                <GeneralProgress />
                <VapeProgress />
                <TimeCompleted />
            </Carrousel>
            <JournalingWords />
            <h2 className='text-2xl text-[#C5C5C5] mt-10'>Achivements</h2>
            <Achivements />
        </div>
    )
}

export default page