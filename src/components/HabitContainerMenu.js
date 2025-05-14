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

export default function HabitContainerMenu({habitID}) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {loadHabits} = useHabits();
    const handleConfirmDelete = async () => {
        try {
            await deleteHabit(habitID);
            await loadHabits();
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

        }
    };


    const handleOptionSelected = (option) => {
        if (option === "delete") {
            onOpen();
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
                    <DropdownItem key="view">Ver informacion</DropdownItem>
                    <DropdownItem key="delete" className="text-danger" color="danger">
                        Eliminar Habito
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} theme="dark">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Eliminar Habito.</ModalHeader>
                            <ModalBody>
                                <p>
                                    ¿Estas seguro que deseas eliminar el habito?.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="danger" onPress={() => { handleConfirmDelete(habitID); onClose(); }}>
                                    Eliminar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

