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
function ChangeLanguageModal({ isOpen, onOpenChange }) {

    const [language, setLanguage] = useState('en');

    const handleSave = async () => {
        const lan = Array.from(language)[0]
        localStorage.setItem('language', lan);
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