import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    addToast,
} from "@heroui/react";
import React, { useState } from 'react'
import Input from "../Input";
import { createExercice } from "@root/utils/gym";
import { useGym } from "@root/context/gymContext";
import { useTranslation } from 'react-i18next';

function AddExerciceModal({ isOpen, onOpen, onOpenChange }) {

    const { t } = useTranslation('common');

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');

    const { loadExercices } = useGym();

    const handleCreate = async () => {
        try {
            await createExercice({ name, reps, sets });
            await loadExercices(true);
            addToast({
                title: t('exercice_created_title', 'Exercice created'),
                description: t('exercice_created_desc', 'The exercice has been created successfully.'),
                color: "success",
                timeout: 2000
            })
        }
        catch (e) {
            addToast({
                title: t('exercice_error_title', 'Error'),
                description: t('exercice_error_desc', 'An error has occurred while creating the exercice.'),
                color: "danger",
                timeout: 2000
            })
            console.log(e);
        }
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} theme="dark">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{t('create_new_exercice', 'Create new exercice')}</ModalHeader>
                        <ModalBody>
                            <Input label={t('exercice_name', 'Name')} placeholder={t('exercice_name_placeholder', 'Exercice')} setText={setName} type="text" />
                            <Input label={t('exercice_sets', 'Sets')} placeholder={t('exercice_sets_placeholder', 'Sets')} setText={setSets} type="number" />
                            <Input label={t('exercice_reps', 'Reps')} placeholder={t('exercice_reps_placeholder', 'Reps')} setText={setReps} type="number" />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                {t('close', 'Close')}
                            </Button>
                            <Button color="primary" onPress={() => { handleCreate(); onClose(); }}>
                                {t('confirm', 'Confirm')}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default AddExerciceModal
