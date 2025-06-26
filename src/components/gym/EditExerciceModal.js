import React, { useState } from 'react'
import Input from '../Input';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, addToast } from '@heroui/react';
import { editExerciceInfo } from '@root/utils/gym';
import { useGym } from '@root/context/gymContext';
function EditExerciceModal({ isOpen, onOpenChange, defName, defSets, defReps, exerciceID }) {

    const [name, setName] = useState(defName);
    const [sets, setSets] = useState(defSets);
    const [reps, setReps] = useState(defReps);
    const { loadExercices } = useGym();
    const handleSave = () => {
        try {
            editExerciceInfo(exerciceID, { name, sets, reps }).then(async () => {
                await loadExercices(true);
                addToast({
                    title: "Exercice edited",
                    description: "The exercice has been edited successfully.",
                    color: "success",
                    timeout: 2000
                })
            });
        }
        catch (e) {
            addToast({
                title: "Error",
                description: "There was an error editing the exercice.",
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
                        <ModalHeader className="flex flex-col gap-1">Edit exercice.</ModalHeader>
                        <ModalBody>
                            <p>Here you can edit the exercice.</p>
                            <Input label="Name" placeholder="Exercice name" defaultValue={defName} setText={setName} />
                            <Input label="Sets" placeholder="Sets" defaultValue={defSets} setText={setSets} />
                            <Input label="Reps" placeholder="Reps" defaultValue={defReps} setText={setReps} />
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="primary" onPress={() => { handleSave(); onClose(); }}>
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default EditExerciceModal