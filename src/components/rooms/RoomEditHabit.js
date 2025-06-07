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
import Input from "../Input";
import CreateNewHabitFourthStep from "../CreateNewHabitFourthStep";
import { redirect } from "next/navigation";
import IconRenderer from "@components/IconRenderer";
import CreateNewHabitFifthStep from "../CreateNewHabitFifthStep";
import { editHabit } from "@lib/rooms";
import { useRooms } from "@root/context/roomsContext";

function RoomEditHabit({ habitID, roomID, isOpen, onOpen, onOpenChange, defName, defWhen, defPersonToBe, defIcon }) {
    const [name, setName] = useState(defName);
    const [when, setWhen] = useState(defWhen);
    const [personToBe, setPersonToBe] = useState(defPersonToBe);
    const [color, setColor] = useState(new Set(["#668C9A"]));
    const [icon, setIcon] = useState(defIcon);

    const { fetchRooms } = useRooms()

    const handleEditHabit = async () => {
        const habit = {
            name: name,
            when: when,
            personToBe: personToBe,
            color: Array.from(color)[0],
            icon: icon
        }

        try {
            console.log(habit)
            await editHabit(habitID, habit);
            await fetchRooms(true);
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
                            <IconRenderer iconName={icon} color="white" />
                            <Input label="Habit" placeholder="Example: Go to the gym" setText={setName} defaultValue={name} />
                            <Input label="When" placeholder="Example: After dinner" setText={setWhen} defaultValue={when} />
                            <Input label="People to be" placeholder="Example: Myself" setText={setPersonToBe} defaultValue={personToBe} />
                            <CreateNewHabitFourthStep color={color} setColor={setColor} />
                            <CreateNewHabitFifthStep overflow={true} onSelect={setIcon} />
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

export default RoomEditHabit;
