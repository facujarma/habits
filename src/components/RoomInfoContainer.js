import React from 'react'
import RoomHabitContainer from './RoomHabitContainer'
import { IconInfoCircle } from '@tabler/icons-react'
import EditRoomInfoModal from './EditRoomInfoModal'
import { useDisclosure } from "@heroui/react";


function RoomInfoContainer({ roomInfo, habits, isAdmin }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    console.log(roomInfo, isAdmin);
    return (
        <div className='w-full my-4'
            key={roomInfo.id}>
            <div className='w-full flex justify-between items-center'>
                <div className='flex flex-col'>
                    <h2 className='text-3xl text-white font-bold'>{roomInfo.name}</h2>
                    <p className='text-base text-[#C5C5C5]'>{roomInfo.description}</p>
                </div>
                <button
                    onClick={onOpen}
                    className='w-12 h-12 bg-[#616161] rounded-full flex items-center justify-center'>
                    <IconInfoCircle className='w-10 h-10 text-white' />
                </button>
                <EditRoomInfoModal roomID={roomInfo.id} isAdmin={isAdmin} isOpen={isOpen} onOpenChange={onOpenChange} onClose={onOpenChange} defName={roomInfo.name} defDescription={roomInfo.description} habitID={roomInfo.id} />
            </div>
            <ul className='flex flex-col gap-4 mt-4'>
                {
                    habits.map((habit) => {
                        return (
                            <RoomHabitContainer
                                key={habit.id}
                                habit={habit} />
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default RoomInfoContainer