import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import { useState } from "react";

export default function AddTimeModal({ isOpen, onOpen, onOpenChange, addTime }) {

    const [time, setTime] = useState('');

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} theme="dark">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Agregar una hora</ModalHeader>
                            <ModalBody>
                                <p>
                                    Ingresa la hora en la que planeas realizar el habito.
                                </p>
                                <input value={time} onChange={(e) => setTime(e.target.value)} type="time" className="w-full px-2 py-2 rounded-lg border border-[#616161] bg-[#D9D9D9] text-[#242424] text-sm" />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={() => { addTime(time); onClose(); }}>
                                    Aceptar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
