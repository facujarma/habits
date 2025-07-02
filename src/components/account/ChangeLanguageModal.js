'use client'

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
import i18n from '@i18n/client'
import { useTranslation } from 'react-i18next'

function ChangeLanguageModal({ isOpen, onOpenChange }) {
    const { t } = useTranslation('common')
    const [language, setLanguage] = useState('en');

    const handleSave = async () => {
        const lan = Array.from(language)[0];
        localStorage.setItem('language', lan);
        await i18n.changeLanguage(lan);
        addToast({
            title: t('save'),
            description: t('language_saved'),
            color: "success",
            timeout: 2000
        });
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} theme="dark">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {t('change_language_modal_title')}
                        </ModalHeader>
                        <ModalBody>
                            <Select onSelectionChange={setLanguage} defaultSelectedKeys={['en']}>
                                <SelectItem key="en">{t('english')}</SelectItem>
                                <SelectItem key="es">{t('spanish')}</SelectItem>
                                <SelectItem key="fr">{t('french')}</SelectItem>
                                <SelectItem key="de">{t('german')}</SelectItem>

                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" onPress={onClose}>
                                {t('cancel')}
                            </Button>
                            <Button color="primary" onPress={() => { handleSave(); onClose(); }}>
                                {t('save')}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ChangeLanguageModal
