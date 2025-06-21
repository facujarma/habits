import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    addToast,
} from "@heroui/react";
import React, { useState } from 'react'
import Input from "../Input";
import { createExercice } from "@root/utils/gym";
import { useGym } from "@root/context/gymContext";

function AddExerciceModal({ isOpen, onOpen, onOpenChange }) {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');

    const { loadExercices } = useGym();

    const handleCreate = async () => {
        try {
            await createExercice({ name, reps, sets });
            await loadExercices(true);
            addToast({
                title: "Exercice created",
                description: "The exercice has been created successfully.",
                color: "success",
                timeout: 2000
            })
        }
        catch (e) {
            addToast({
                title: "Error",
                description: "An error has occurred while creating the exercice.",
                color: "danger",
                timeout: 2000
            })
            console.log(e);
        }
    }

    return (
        <div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} theme="dark">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create new exercice</ModalHeader>
                            <ModalBody>
                                <Input label="Name" placeholder="Exercice" setText={setName} type="text" />
                                <Input label="Sets" placeholder="Sets" setText={setSets} type="number" />
                                <Input label="Reps" placeholder="Reps" setText={setReps} type="number" />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => { handleCreate(); onClose(); }}>
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default AddExerciceModal