import React, { useState } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    addToast,
    Button,
    useDisclosure
} from "@heroui/react";
import { IconTrash, IconUserPlus } from '@tabler/icons-react';
import { expulseMemberFromRoom, makeMemberAdmin } from '@root/utils/rooms';

function MemberContainer({ member }) {

    const [alertText, setAlertText] = useState('');
    const [confirmFunction, setConfirmFunction] = useState(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const removeMember = async (id) => {
        try {
            await expulseMemberFromRoom(roomID, id);
            addToast({
                title: 'Success',
                description: 'Member removed successfully',
                status: 'success',
            });
        } catch (e) {
            addToast({
                title: 'Error',
                description: "Couldn't remove member, an error occurred",
                status: 'error',
            });
            console.log(e)
        }
    }

    const makeAdmin = async (id) => {
        try {
            await makeMemberAdmin(roomID, id);
            addToast({
                title: 'Success',
                description: 'Member made admin successfully',
                status: 'success',
            });
        } catch (e) {
            addToast({
                title: 'Error',
                description: "Couldn't make member admin, an error occurred",
                status: 'error',
            });
            console.log(e)
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} theme="dark">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Are you sure!?</ModalHeader>
                            <ModalBody>
                                <p>
                                    {alertText}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={() => { confirmFunction() }}>
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >

            <div className='w-full flex justify-between items-center my-4 border border-[#616161] bg-[#242424]/40 rounded-2xl p-4' >
                <div className='w-full flex justify-between items-center'>
                    <div className='flex flex-col'>
                        <h2 className='text-xl text-white font-bold'>{member.username}</h2>
                        <p className='text-sm text-[#C5C5C5]'>{member.role}</p>
                    </div>

                    <div className='flex gap-2'>
                        <Button
                            className='aspect-square px-0 h-10 min-w-0 flex items-center justify-center'
                            onClick={() => {
                                setAlertText(`Are you sure you want to make this member: ${member.username} an admin of the room?`);
                                setConfirmFunction(() => () => makeAdmin(member.userID));
                                onOpen();
                            }}>
                            <IconUserPlus />
                        </Button>

                        <Button
                            onClick={() => {
                                setAlertText(`Are you sure you want to remove ${member.username} from the room?`);
                                setConfirmFunction(() => () => removeMember(member.userID));
                                onOpen();
                            }}
                            color="danger"
                            className='aspect-square px-0 h-10 min-w-0 flex items-center justify-center'>
                            <IconTrash />
                        </Button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default MemberContainer