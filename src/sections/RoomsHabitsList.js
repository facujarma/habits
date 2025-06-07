import RoomInfoContainer from '@rooms/RoomInfoContainer';
import React from 'react'
import { useRooms } from '@root/context/roomsContext';
import Button from '@components/Button';
import { IconPlus } from '@tabler/icons-react';
import { redirect } from 'next/navigation';

function RoomsHabitsList() {

    const { loading, rooms } = useRooms();

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className='w-full my-6'>
                <Button text='Create room' icon={<IconPlus />} handleClick={() => { redirect('/rooms/createRoom') }} />
            </div>
            {
                rooms &&
                    rooms.length === 0 ?
                    <h2 className='text-[#C5C5C5]/50 text-2xl text-center my-6'> No rooms found </h2> :
                    rooms.map((room) => (
                        <div key={room.room.id}>
                            <RoomInfoContainer roomInfo={room.room} habits={room.habits} isAdmin={room.isAdmin} />
                        </div>
                    ))
            }
        </div>
    )
}

export default RoomsHabitsList