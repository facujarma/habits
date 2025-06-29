import React, { useState } from 'react'
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    addToast,
    Select
} from "@heroui/react";
import { SelectItem } from '@heroui/select';
import i18n from '@i18n/client'; // importa tu instancia i18n

function ChangeLanguageModal({ isOpen, onOpenChange }) {
    const [language, setLanguage] = useState('en');

    const handleSave = async () => {
        // language es un Set de keys seleccionadas, convertimos a array y tomamos la primera
        const lan = Array.from(language)[0];
        localStorage.setItem('language', lan);
        await i18n.changeLanguage(lan); // cambia idioma en i18next
        addToast({ title: "Saved", description: "Language saved successfully.", color: "success", timeout: 2000 });
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} theme="dark">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Change Language.</ModalHeader>
                        <ModalBody>
                            <Select onSelectionChange={setLanguage} defaultSelectedKeys={['en']}>
                                <SelectItem key="en">English</SelectItem>
                                <SelectItem key="es">Spanish</SelectItem>
                            </Select>
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

export default ChangeLanguageModal
