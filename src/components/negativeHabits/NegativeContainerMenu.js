'use client'

import React from "react"
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
} from "@heroui/react"
import { IconMenu2 } from "@tabler/icons-react"
import { useNegativeHabits } from "@root/context/negativeHabitContext"
import { deleteNegativeHabit } from "@lib/negativeHabit"
import { useTranslation } from "react-i18next"

export default function NegativeContainerMenu({ negativeID }) {
    const { t } = useTranslation('common')
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { loadNegativeHabits } = useNegativeHabits()

    const handleConfirmDelete = async () => {
        try {
            await deleteNegativeHabit(negativeID)
            await loadNegativeHabits()
            addToast({
                title: t('negativeContainerMenu_toast_success_title'),
                description: t('negativeContainerMenu_toast_success_description'),
                color: "success",
                timeout: 2000
            })
        } catch (e) {
            addToast({
                title: t('negativeContainerMenu_toast_error_title'),
                description: t('negativeContainerMenu_toast_error_description'),
                color: "danger",
                timeout: 2000
            })
            console.log(e)
        }
    }

    const handleOptionSelected = (option) => {
        if (option === "delete") {
            onOpen()
        }
        if (option === "view") {
            window.location.href = `/habits/info/negative/${negativeID}`
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
                <DropdownMenu aria-label="Dropdown Variants" onAction={handleOptionSelected}>
                    <DropdownItem key="view">{t('negativeContainerMenu_dropdown_view')}</DropdownItem>
                    <DropdownItem key="delete" className="text-danger" color="danger">
                        {t('negativeContainerMenu_dropdown_delete')}
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} theme="dark">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {t('negativeContainerMenu_modal_title')}
                            </ModalHeader>
                            <ModalBody>
                                <p>{t('negativeContainerMenu_modal_body')}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" variant="light" onPress={onClose}>
                                    {t('negativeContainerMenu_modal_cancel')}
                                </Button>
                                <Button color="danger" onPress={() => { handleConfirmDelete(); onClose(); }}>
                                    {t('negativeContainerMenu_modal_confirm')}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
