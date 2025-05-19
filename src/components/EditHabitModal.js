import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    addToast
} from "@heroui/react";
import { useEffect, useState } from "react";
import Input from "./Input";
import CreateNewHabitFourthStep from "./CreateNewHabitFourthStep";
import { editHabit } from "@root/utils/habits";
import { redirect } from "next/navigation";

function EditHabitModal({ habitID, isOpen, onOpen, onOpenChange, defName, defWhen, defPersonToBe }) {
    const [name, setName] = useState(defName);
    const [when, setWhen] = useState(defWhen);
    const [personToBe, setPersonToBe] = useState(defPersonToBe);
    const [color, setColor] = useState(new Set(["#668C9A"]));

    const handleEditHabit = async () => {
        const habit = {
            name: name,
            when: when,
            personToBe: personToBe,
            color: Array.from(color)[0],
        }

        try {
            await editHabit(habitID, habit);
            addToast({
                title: "Habit edited",
                description: "The habit has been edited successfully.",
                color: "success",
                timeout: 2000
            })
            redirect('/habits');
        }
        catch (e) {
            addToast({
                title: "Error",
                description: "An error has occurred while editing the habit.",
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
                        <ModalHeader className="flex flex-col gap-1">Edit Habit.</ModalHeader>
                        <ModalBody>
                            <p>Here you can edit the habit.</p>
                            <Input label="Habit" placeholder="Example: Go to the gym" setText={setName} defaultValue={name} />
                            <Input label="When" placeholder="Example: After dinner" setText={setWhen} defaultValue={when} />
                            <Input label="Person to be" placeholder="Example: Myself" setText={setPersonToBe} defaultValue={personToBe} />
                            <CreateNewHabitFourthStep color={color} setColor={setColor} />
                            <Button color="primary" onPress={handleEditHabit}>
                                Edit
                            </Button>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="danger" onPress={() => { /* handleConfirmDelete */; onClose(); }}>
                                Delete
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default EditHabitModal;
