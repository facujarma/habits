import React, { useState } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    addToast,
    Button
} from "@heroui/react";
import Input from './Input';
import { useRooms } from '@root/context/roomsContext';
import CustomButton from './Button';
import { IconClipboard } from '@tabler/icons-react';
function EditRoomInfoModal({ isOpen, onOpenChange, onClose, defName, defDescription, roomID, isAdmin, roomLink }) {

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
                            <CustomButton
                                text="Copy invitation link"
                                icon={<IconClipboard />}
                                handleClick={() =>
                                    navigator.clipboard.writeText(window.location.origin + "/api/invite/" + roomLink).then(() => {
                                        addToast({
                                            title: "Copied",
                                            description: "The invitation link has been copied to the clipboard.",
                                            color: "success",
                                            timeout: 2000
                                        })
                                    })
                                }
                            />                        </ModalBody>
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