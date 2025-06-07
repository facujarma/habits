import RoomAddHabit from '@rooms/RoomAddHabit';
import RoomSelector from '@rooms/RoomSelector';
import SeparatorLine from '@root/components/SeparatorLine';
import { RoomsProvider } from '@root/context/roomsContext'
import Header from '@sections/Header';
import { isUserAdmin } from '@lib/rooms';
import React from 'react'

async function page({ params }) {

    const { id } = await params

    const isAdmin = async () => {
        const isAdmin = await isUserAdmin(id);
        console.log(isAdmin);
        return isAdmin
    }
    const isAdm = isAdmin();
    if (!isAdm) {
        redirect('/habits');
    }

    return (
        <div>
            <RoomsProvider>
                <Header title={"Add a habit to the room:"} text={"In this section, you can add new habits to the rooms where you are an admin."} />
                <RoomSelector roomId={id} />
                <SeparatorLine />
                <p className="text-[#C5C5C5] text-base leading-6 my-5">
                    Now complete the information for the habit you want to add.
                </p>
                <RoomAddHabit roomId={id} />
            </RoomsProvider>
        </div>
    )
}

export default page