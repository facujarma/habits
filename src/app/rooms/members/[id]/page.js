import MembersList from '@root/components/rooms/MembersList'
import { RoomsProvider } from '@root/context/roomsContext'
import React from 'react'

async function page({ params }) {

    const { id } = await params

    return (
        <div className="w-full h-full">
            <RoomsProvider>

                <MembersList roomID={id} />
            </RoomsProvider>
        </div>
    )
}

export default page