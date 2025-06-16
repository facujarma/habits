import JoinRoomForm from '@root/components/rooms/JoinRoomForm'
import Header from '@root/sections/Header'
import React from 'react'

async function page({ params }) {

    const { token } = await params

    return (
        <div>
            <Header title={"You have been invited!"} text={"A great way to get motivated and feel like doing a habit is to join a group with friends who are in the same situation."} />
            <JoinRoomForm token={token} />
        </div>
    )
}

export default page