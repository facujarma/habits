'use client'

import React, { useEffect, useState } from 'react'
import { useRooms } from '@root/context/roomsContext';
import RoomHabitInfoTitle from './RoomHabitInfoTitle';
import RoomHabitInfoIsAdminBanner from './RoomHabitInfoIsAdminBanner';
import RoomHabitInfoLeaderBoard from './RoomHabitInfoLeaderBoard';
import { Skeleton } from '@heroui/skeleton';

function RoomHabitAllInfo({ habitID }) {

    const { rooms } = useRooms();
    const [habit, setHabit] = useState({});
    const [roomID, setRoomID] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        // Buscar el hábito directamente
        const room = rooms.find(room =>
            room.habits.find(habit => habit.id.toString() === habitID)
        );

        if (room) {
            setRoomID(room.room.id);
            const foundHabit = room.habits.find(habit => habit.id.toString() === habitID);
            setHabit(foundHabit);
        } else {
            setHabit(null);
        }

        setLoading(false);
    }, [rooms, habitID]);

    if (loading || !habit) return (
        <div>
            <Skeleton className='rounded-2xl'>
                <div className="w-full rounded-2xl border flex items-center py-4">
                </div>
            </Skeleton>
            <Skeleton className='mt-6 rounded-2xl'>
                <div className='w-full p-2 rounded-2xl bg-[#242424] border border-[#616161] mt-6'>
                </div>
            </Skeleton>
        </div>
    );

    return (
        <div>
            <RoomHabitInfoTitle icon={habit.icon} title={habit.name} when={habit.when} personToBe={habit.personToBe} color={habit.color} />

            <RoomHabitInfoIsAdminBanner habitID={habitID} />
            <RoomHabitInfoLeaderBoard roomID={roomID} habitID={habitID} />
        </div>
    )
}

export default RoomHabitAllInfo