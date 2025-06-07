import CreateRoomForm from '@sections/CreateRoomForm'
import Header from '@sections/Header'
import React from 'react'

function page() {
    return (
        <div className="w-full h-full mb-10">
            <Header title={"Create a new room:"} text={"A great way to get motivated and feel like doing a habit is to create a group with friends who are in the same situation."} />
            <CreateRoomForm />
        </div>
    )
}

export default page