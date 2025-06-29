import { Select } from '@heroui/react'
import { SelectItem } from '@heroui/select'
import React from 'react'
import { useTranslation } from 'react-i18next'

function coloredDot(color) {
    const col = Array.from(color)[0]
    return (
        <div
            className="w-4 aspect-square rounded-full"
            style={{ backgroundColor: col }}
        />
    )
}

function CreateNewHabitFourthStep({ color, setColor }) {
    const { t } = useTranslation('common')

    return (
        <div className="w-full flex flex-col gap-6 py-6">
            <h2 className="text-[#C5C5C5] text-xl">{t('createNewHabit_fourthStep_color')}:</h2>
            <Select
                variant='faded'
                onSelectionChange={setColor}
                startContent={coloredDot(color)}
                defaultSelectedKeys={['#668C9A']}
            >
                <SelectItem key="#82669A">{t('createNewHabit_fourthStep_violet')}</SelectItem>
                <SelectItem key="#668C9A">{t('createNewHabit_fourthStep_green')}</SelectItem>
                <SelectItem key="#7D9A66">{t('createNewHabit_fourthStep_yellow')}</SelectItem>
            </Select>
        </div>
    )
}

export default CreateNewHabitFourthStep
