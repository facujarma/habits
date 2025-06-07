import { Button, useDisclosure } from '@heroui/react';
import { Skeleton } from '@heroui/skeleton';
import { useRooms } from '@root/context/roomsContext';
import { isUserAdmin } from '@lib/rooms';
import React, { useEffect, useState } from 'react'
import RoomRemoveHabitModal from './RoomRemoveHabitModal';
import RoomEditHabit from './RoomEditHabit';
import { IconTrash } from '@tabler/icons-react';

function RoomHabitInfoIsAdminBanner({ habitID, habit }) {

    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [roomID, setRoomID] = useState(null);
    const { rooms } = useRooms();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpenRemove, onOpen: onOpenRemove, onOpenChange: onOpenChangeRemove } = useDisclosure();


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
                        <div className='flex gap-2 mt-4'>
                            <Button color='danger' className="aspect-square" onClick={onOpenRemove}> <IconTrash /> </Button>
                            <Button className='w-full' onClick={onOpen}> Edit the habit </Button>
                        </div>
                        <RoomRemoveHabitModal isOpen={isOpenRemove} onOpenChange={onOpenChangeRemove} habitID={habitID} />

                        <RoomEditHabit roomID={roomID} habitID={habitID} isOpen={isOpen} onOpenChange={onOpenChange} defName={habit.name} defWhen={habit.when} defPersonToBe={habit.personToBe} defIcon={habit.icon} />
                    </>
                    : <p className='text-center'>This habit belongs to a room in where you are a member</p>
            }
        </div>
    )
}

export default RoomHabitInfoIsAdminBanner