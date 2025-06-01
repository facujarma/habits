import React from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    addToast
} from "@heroui/react";
import { IconMenu2 } from "@tabler/icons-react";
import { deleteHabit } from "@root/utils/habits";
import { useHabits } from "@root/context/habitContext";

export default function HabitContainerMenu({ habitID }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { loadHabits } = useHabits();
    const handleConfirmDelete = async () => {
        try {
            await deleteHabit(habitID);
            await loadHabits(true);
            addToast({
                title: "Hábito eliminado",
                description: "El hábito se ha eliminado correctamente.",
                color: "success",
                timeout: 2000
            })
        } catch (e) {
            addToast({
                title: "Error",
                description: "Ha ocurrido un error al eliminar el hábito.",
                color: "danger",
                timeout: 2000
            })
            console.log(e)
        }
    };


    const handleOptionSelected = (option) => {
        if (option === "delete") {
            onOpen();
        }
        if (option === "view") {
            window.location.href = `/habits/info/positive/${habitID}`
        }
    }

    return (
        <>

            <Dropdown>
                <DropdownTrigger>
                    <div className="rounded-r-xl h-full p-2 border-l border-[#616161] flex items-center justify-center bg-[#242424] hover:bg-[#616161] duration-200">
                        <IconMenu2 className="text-[#C5C5C5]" size={32} />
                    </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dropdown Variants" onAction={(key) => handleOptionSelected(key)}>
                    <DropdownItem key="view">View Habit</DropdownItem>
                    <DropdownItem key="delete" className="text-danger" color="danger">
                        Delete Habit
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} theme="dark">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete Habit.</ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to delete this habit?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="danger" onPress={() => { handleConfirmDelete(); onClose(); }}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

