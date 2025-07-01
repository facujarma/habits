'use client'

import React, { useState } from 'react'
import Input from '@root/components/Input'
import SeparatorLine from '@root/components/SeparatorLine'
import Button from '../Button'
import ExerciceSelector from './ExerciceSelector'
import { createWorkoutWithExercices } from '@root/utils/gym'
import { addToast } from '@heroui/toast'
import { useGym } from '@root/context/gymContext'
import { useTranslation } from 'react-i18next'

function CreateSessionForm() {
    const { t } = useTranslation('common')

    const [selectors, setSelectors] = useState([{ id: Date.now(), exerciceID: null }])
    const { loadWorkouts } = useGym()
    const [name, setName] = useState('')

    const addSelector = () => {
        setSelectors(prev => [...prev, { id: Date.now(), exerciceID: null }])
    }

    const updateSelector = (id, exerciceID) => {
        setSelectors(prev =>
            prev.map(sel => (sel.id === id ? { ...sel, exerciceID } : sel))
        )
    }

    const removeSelector = (id) => {
        setSelectors(prev => prev.filter(sel => sel.id !== id))
    }

    const moveSelector = (index, direction) => {
        const newOrder = [...selectors]
        const targetIndex = index + direction

        if (targetIndex < 0 || targetIndex >= selectors.length) return

        const temp = newOrder[index]
        newOrder[index] = newOrder[targetIndex]
        newOrder[targetIndex] = temp
        setSelectors(newOrder)
    }

    const handleSave = () => {
        if (!name) {
            addToast({
                title: t('error', 'Error'),
                description: t('session_name_required', 'Please provide a name for the session.'),
                color: "danger",
                timeout: 2000
            })
            return
        }

        try {
            createWorkoutWithExercices(name, selectors.map(sel => sel.exerciceID)).then(async () => {
                await loadWorkouts(true)
                addToast({
                    title: t('session_created', 'Session created'),
                    description: t('session_created_success', 'The session has been created successfully.'),
                    color: "success",
                    timeout: 2000
                })
            })

        } catch (error) {
            console.error(error)
            addToast({
                title: t('error', 'Error'),
                description: t('session_create_error', 'An error occurred while creating the session.'),
                color: "danger",
                timeout: 2000
            })
        }
    }

    return (
        <div className='flex flex-col gap-6'>
            <Input
                label={t('session_name_label', 'Session name')}
                placeholder={t('session_name_placeholder', 'Type your session name')}
                setText={setName}
            />
            <SeparatorLine />
            <div className='flex flex-col gap-4'>
                {selectors.map((sel, index) => (
                    <div key={sel.id}>
                        <span className='text-[#C5C5C5] text-xl mb-2'>
                            {index + 1}
                        </span>
                        <ExerciceSelector
                            id={sel.id}
                            selectedID={sel.exerciceID}
                            onSelect={updateSelector}
                            onRemove={() => removeSelector(sel.id)}
                            onMoveUp={() => moveSelector(index, -1)}
                            onMoveDown={() => moveSelector(index, 1)}
                            isFirst={index === 0}
                            isLast={index === selectors.length - 1}
                        />
                    </div>
                ))}
            </div>
            <Button text={t('add_exercice', 'Add an exercice')} className='max-h-10' handleClick={addSelector} />
            <Button text={t('save_create', 'Save & Create')} className='max-h-10' handleClick={handleSave} />
        </div>
    )
}

export default CreateSessionForm
