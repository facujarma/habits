import React from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    addToast,
    Button
} from "@heroui/react";
import { deleteHabitFromRoom } from '@lib/rooms';
import { useRooms } from '@root/context/roomsContext';
import { redirect } from 'next/dist/server/api-utils';

function RoomRemoveHabitModal({ isOpen, onOpenChange, habitID }) {

    const { rooms, fetchRooms } = useRooms();

    const handleDelete = async () => {
        const room = rooms.find(room =>
            room.habits.find(habit => habit.id.toString() === habitID)
        );

        try {
            await deleteHabitFromRoom(habitID, room.room.id);
            await fetchRooms(true);
            redirect(`/habits`);
        }
        catch (error) {
            console.error(error);
            addToast({
                title: 'Error deleting habit',
                description: "There was an error deleting the habit",
                color: 'danger',
            })
        }
    }


    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} theme="dark">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Edit Room information.</ModalHeader>
                        <ModalBody>
                            <p>
                                Do you want to remove the habit?
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="primary" onPress={() => { handleDelete(); }}>
                                Confirm
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default RoomRemoveHabitModal