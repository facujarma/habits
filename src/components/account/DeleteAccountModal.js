import React, { useState } from 'react'
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    addToast
} from "@heroui/react";
function DeleteAccountModal({ isOpen, onOpenChange }) {

    const [text, setText] = useState('');

    const handleConfirm = () => {
        if (text != 'DELETE MY ACCOUNT') {
            addToast({
                title: "Wrong input.",
                description: "Please write 'DELETE MY ACCOUNT'.",
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
                        <ModalHeader className="flex flex-col gap-1">Delete Account.</ModalHeader>
                        <ModalBody>
                            <p className='text-xl font-bold'>Are you sure you want to delete your account?</p>
                            <span className='text-lg text-red-500'>
                                This action is irreversible.
                            </span>
                            <span>
                                Write "DELETE MY ACCOUNT" to confirm
                            </span>
                            <input
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className='text-[#C5C5C5] text-base h-12 bg-[#242424] rounded-2xl border border-[#616161] px-2 py-1'>
                            </input>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="danger" onPress={() => { handleConfirm(); }}>
                                Confirm
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default DeleteAccountModal