import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    addToast
} from "@heroui/react";
import { useState } from "react";
import Input from "@components/Input";
import CreateNewHabitFourthStep from "@components/CreateNewHabitFourthStep";
import { useNegativeHabits } from "@root/context/negativeHabitContext";
import { editNegative } from "@lib/negativeHabit";

function EditNegativeModal({ negativeID, isOpen, onOpen, onOpenChange, defBad, defGood }) {
    const [badHabit, setBadHabit] = useState(defBad);
    const [goodHabit, setGoodHabit] = useState(defGood);
    const [color, setColor] = useState(new Set(["#668C9A"]));
    const { loadNegativeHabits } = useNegativeHabits()
    const handleEditHabit = async () => {
        const negative = {
            bad_habit: badHabit,
            good_habit: goodHabit,
            color: Array.from(color)[0],
        }

        try {
            await editNegative(negativeID, negative);
            await loadNegativeHabits(true);
            addToast({
                title: "Negative habit edited",
                description: "The negative habit has been edited successfully.",
                color: "success",
                timeout: 2000
            })

        }
        catch (e) {
            addToast({
                title: "Error",
                description: "An error has occurred while editing the habit.",
                color: "danger",
                timeout: 2000
            })
            console.log(e)
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
                            <Input label="Bad Habit" placeholder="Example: Smoking" setText={setBadHabit} defaultValue={badHabit} />
                            <Input label="Good Habit" placeholder="Example: Exercising" setText={setGoodHabit} defaultValue={goodHabit} />
                            <CreateNewHabitFourthStep color={color} setColor={setColor} />

                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="primary" onPress={() => { handleEditHabit(); onClose(); }}>
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default EditNegativeModal;
