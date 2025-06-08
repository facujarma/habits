import GeneralProgress from '@root/components/you/GeneralProgress'
import Header from '@sections/Header'
import React from 'react'

function page() {
    return (
        <div>
            <Header title="You" text={"This is your space. Here, we show your account information and the stats on how your progress with Habits. has evolved."} />
            <GeneralProgress />

        </div>
    )
}

export default page