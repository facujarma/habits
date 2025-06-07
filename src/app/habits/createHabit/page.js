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
} from "@heroui/react";
function Page() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const useTemplate = async (habitTemplate) => {
        try {
            await addHabit(habitTemplate);
            addToast({
                title: "Habit created",
                description: "The habit has been created successfully.",
                color: "success",
                timeout: 2000
            })
        } catch (e) {
            addToast({
                title: "Error",
                description: "There was an error while creating the habit.",
                color: "error",
                timeout: 2000
            })
            console.log(e)
        }
        onOpenChange();
    }

    const [selectedTemplate, setSelectedTemplate] = useState(null);
    return (
        <div>
            <Header title="Create a new habit:" text="We have two types of habits: positive and negative. Choose the one that best fits your needs." />
            <div className='flex flex-col gap-10'>
                <SelectHabitTypeBlock color={"#82669A"} title={"Create a new positive:"} text={"Create a habit that you’ll need to complete on certain days of the week. We’ll keep track of the days you perform the habit."} goTo={'/habits/createHabit/positive'} />
                <SelectHabitTypeBlock color={"#9A6666"} title={"Create a new negative:"} text={"Create a negative habit — that is, a habit in reverse. All days will be marked as completed by default, and you’ll need to unmark the days on which you actually do the habit."} goTo={'/habits/createHabit/negative'} />
            </div>
            <h2 className='text-xl text-[#C5C5C5] my-4'>Or use our templates:</h2>
            <ul className='flex flex-col gap-4'>
                {
                    positiveTemplates.map((template, index) => (
                        <HabitTemplateCard
                            key={index}
                            color={"#666F9A"}
                            title={template.name}
                            text={template.text}
                            handleClick={() => {
                                setSelectedTemplate(template);
                                onOpen();
                            }}
                        />
                    ))
                }
            </ul>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} theme="dark">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Use a template.</ModalHeader>
                            <ModalBody>
                                <p>A new habit will be created on your home screen with these characteristics. However, remember that you can modify them once the habit is created in the "View Habit Information" section.</p>
                                <span> <b>Name:</b> {selectedTemplate.name}</span>
                                <span> <b>when:</b> {selectedTemplate.when}</span>
                                <span> <b>Person to be:</b> {selectedTemplate.personToBe}</span>
                                <span> <b>color:</b> {selectedTemplate.color}</span>
                                <span> <b>Days:</b> {Object.keys(selectedTemplate.weekdays).join(', ')} </span>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={() => { useTemplate(selectedTemplate); }}>
                                    Confirm
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
