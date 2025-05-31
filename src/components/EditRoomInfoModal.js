import React, { useState } from 'react'
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    addToast,
} from "@heroui/react";
import Input from './Input';
import { useRooms } from '@root/context/roomsContext';
function EditRoomInfoModal({ isOpen, onOpenChange, onClose, defName, defDescription, roomID, isAdmin }) {

    const [name, setName] = useState(defName);
    const [description, setDescription] = useState(defDescription);

    const { editRoomInfo } = useRooms()

    const handleChange = async () => {
        try {
            await editRoomInfo(roomID, { name, description });
            addToast({
                title: "Room edited",
                description: "The room has been edited successfully.",
                color: "success",
                timeout: 2000
            })

        }
        catch (e) {
            console.log(e)
            addToast({
                title: "Error",
                description: "An error occurred while editing the room.",
                color: "danger",
                timeout: 2000
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
                            <Input disabled={!isAdmin} label="Room Name" placeholder="Ex. Room 1" defaultValue={name} setText={setName} />
                            <Input disabled={!isAdmin} label="Description" placeholder="Ex. Gym Room for workouts" defaultValue={description} setText={setDescription} />
                        </ModalBody>
                        <ModalFooter>
                            <Button onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="primary" onPress={() => { handleChange(); }}>
                                Edit
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default EditRoomInfoModal