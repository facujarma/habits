import RoomInfoContainer from '@root/components/RoomInfoContainer';
import React from 'react'
import { useRooms } from '@root/context/roomsContext';

function RoomsHabitsList() {

    const { loading, rooms } = useRooms();

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {
                rooms &&
                rooms.map((room) => (
                    <div key={room.room.id}>
                        <RoomInfoContainer roomInfo={room.room} habits={room.habits} />
                    </div>
                ))
            }
        </div>
    )
}

export default RoomsHabitsList