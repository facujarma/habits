'use client'

import React, { useState } from 'react'
import HabitTemplateCard from '@habits/HabitTemplateCard'
import SelectHabitTypeBlock from '@habits/SelectHabitTypeBlock'
import Header from '@sections/Header'
import { positiveTemplates } from '@lib/templates'
import { addHabit } from '@lib/habits'
import { addToast } from '@heroui/toast'
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from "@heroui/react"
import { useHabits } from '@root/context/habitContext'
import { useTranslation } from 'react-i18next'
function Page() {
    const { t } = useTranslation('common')
    const { loadHabits } = useHabits()
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [selectedTemplate, setSelectedTemplate] = useState(null)

    const useTemplate = async (habitTemplate) => {
        try {
            const { text, ...templateWithoutText } = habitTemplate
            await addHabit(templateWithoutText)
            await loadHabits(true)
            addToast({
                title: t('createHabit_toast_created_title'),
                description: t('createHabit_toast_created_description'),
                color: "success",
                timeout: 2000
            })
        } catch (e) {
            addToast({
                title: t('createHabit_toast_error_title'),
                description: t('createHabit_toast_error_description'),
                color: "danger",
                timeout: 2000
            })
            console.log(e)
        }
        onOpenChange()
    }

    return (
        <div>
            <Header title={t('createHabit_header_title')} text={t('createHabit_header_text')} />
            <div className='flex flex-col gap-10'>
                <SelectHabitTypeBlock
                    color={"#82669A"}
                    title={t('createHabit_positive_title')}
                    text={t('createHabit_positive_text')}
                    goTo={'/habits/createHabit/positive'}
                />
                <SelectHabitTypeBlock
                    color={"#9A6666"}
                    title={t('createHabit_negative_title')}
                    text={t('createHabit_negative_text')}
                    goTo={'/habits/createHabit/negative'}
                />
            </div>
            <h2 className='text-xl text-[#C5C5C5] my-4'>{t('createHabit_templates_header')}</h2>
            <ul className='flex flex-col gap-4'>
                {
                    positiveTemplates.map((template, index) => (
                        <HabitTemplateCard
                            key={index}
                            color={"#666F9A"}
                            title={template.name}
                            text={template.text}
                            handleClick={() => {
                                setSelectedTemplate(template)
                                onOpen()
                            }}
                        />
                    ))
                }
            </ul>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} theme="dark">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{t('createHabit_modal_title')}</ModalHeader>
                            <ModalBody>
                                <p>{t('createHabit_modal_description')}</p>
                                <span><b>{t('createHabit_modal_name')}</b> {selectedTemplate?.name}</span><br />
                                <span><b>{t('createHabit_modal_when')}</b> {selectedTemplate?.when}</span><br />
                                <span><b>{t('createHabit_modal_personToBe')}</b> {selectedTemplate?.personToBe}</span><br />
                                <span><b>{t('createHabit_modal_color')}</b> {selectedTemplate?.color}</span><br />
                                <span><b>{t('createHabit_modal_days')}</b> {selectedTemplate ? Object.keys(selectedTemplate.weekdays).join(', ') : ''}</span>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="light" onPress={onClose}>
                                    {t('createHabit_modal_cancel')}
                                </Button>
                                <Button color="primary" onPress={() => useTemplate(selectedTemplate)}>
                                    {t('createHabit_modal_confirm')}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Page
