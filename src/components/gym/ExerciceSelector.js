import { Select } from '@heroui/react'
import { SelectItem } from '@heroui/select'
import { useGym } from '@root/context/gymContext'
import React from 'react'
import ExerciceCard from './ExerciceCard'
import { IconBarbell, IconX, IconArrowUp, IconArrowDown } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

function ExerciceSelector({ id, selectedID, onSelect, onRemove, onMoveUp, onMoveDown, isFirst, isLast }) {
    const { exercices } = useGym()
    const { t } = useTranslation('common')

    const selectedExercice = exercices.find(e => e.id.toString() === selectedID?.toString())

    const handleSelect = (idSet) => {
        const exerciceId = Array.from(idSet)[0]
        onSelect(id, exerciceId)
    }

    return (
        <div className='flex flex-col gap-4 bg-[#191919] p-4 rounded-2xl relative'>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    {!isFirst && (
                        <button aria-label={t('move_up', 'Move up')} onClick={onMoveUp}>
                            <IconArrowUp size={20} />
                        </button>
                    )}
                    {!isLast && (
                        <button aria-label={t('move_down', 'Move down')} onClick={onMoveDown}>
                            <IconArrowDown size={20} />
                        </button>
                    )}
                </div>
                <button aria-label={t('remove', 'Remove')} onClick={onRemove}>
                    <IconX size={20} className="text-red-500" />
                </button>
            </div>

            <Select onSelectionChange={handleSelect} selectedKeys={selectedID ? [selectedID.toString()] : []}>
                {exercices.map((exercice) => (
                    <SelectItem key={exercice.id}>{exercice.name}</SelectItem>
                ))}
            </Select>

            {selectedExercice && (
                <div className='relative w-full p-3 bg-[#242424] border border-[#616161] rounded-2xl flex flex-col gap-2'>
                    <IconBarbell size={36} className='text-[#616161] absolute top-3 right-3' />
                    <h2 className='text-2xl font-bold'>{selectedExercice.name}</h2>
                    <span>
                        {selectedExercice.sets} {t('sets', 'sets')} - {selectedExercice.reps} {t('repetitions', 'repetitions')}
                    </span>
                </div>
            )}
        </div>
    )
}

export default ExerciceSelector
