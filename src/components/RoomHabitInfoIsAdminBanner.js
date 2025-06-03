import { Button } from '@heroui/react';
import { Skeleton } from '@heroui/skeleton';
import { useRooms } from '@root/context/roomsContext';
import { isUserAdmin } from '@root/utils/rooms';
import React, { useEffect, useState } from 'react'

function RoomHabitInfoIsAdminBanner({ habitID }) {

    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const { rooms } = useRooms();
    useEffect(() => {
        const fetchAdmin = async () => {

            const room = rooms.find(room =>
                room.habits.find(habit => habit.id.toString() === habitID)
            );

            const adm = await isUserAdmin(room.room.id);

            setIsAdmin(adm);
            setLoading(false);
        }

        fetchAdmin();
    }, []);


    if (loading) return (
        <Skeleton className='mt-6 rounded-2xl'>
            <div className='w-full p-2 rounded-2xl bg-[#242424] border border-[#616161] mt-6'>
            </div>
        </Skeleton>)

    return (

        <div className='w-full p-2 rounded-2xl bg-[#242424] border border-[#616161] mt-6'>
            {

                isAdmin ?
                    <>
                        <p className='text-center'>You are an admin of this room</p>
                        <Button className='w-full mt-4'> Edit the habit </Button>
                    </>
                    : <p className='text-center'>This habit belongs to a room in where you are a member</p>
            }
        </div>
    )
}

export default RoomHabitInfoIsAdminBanner