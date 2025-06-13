import Carrousel from '@root/components/you/Carrousel'
import GeneralProgress from '@you/GeneralProgress'
import Header from '@sections/Header'
import React from 'react'
import VapeProgress from '@root/components/you/VapeProgress'
import JournalingWords from '@root/components/you/JournalingWords'

function page() {
    return (
        <div>
            <Header title="You" text={"This is your space. Here, we show your account information and the stats on how your progress with Habits. has evolved."} />
            <Carrousel >
                <GeneralProgress />
                <VapeProgress />

            </Carrousel>
            <JournalingWords />
        </div>
    )
}

export default page