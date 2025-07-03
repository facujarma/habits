'use client';

import { Select } from '@heroui/react';
import { SelectItem } from '@heroui/select';
import React from 'react';
import { useTranslation } from 'react-i18next';

function ColoredDot({ color }) {
    const col = Array.from(color)[0];
    return (
        <div
            className="w-4 aspect-square rounded-full"
            style={{ backgroundColor: col }}
        />
    );
}

function CreateNewHabitFourthStep({ color, setColor }) {
    const { t } = useTranslation('common');
    // Si por algún motivo el setColor llegara vacío, usamos este fallback
    const fallback = '#668C9A';
    const current = Array.from(color)[0] || fallback;

    return (
        <div className="w-full flex flex-col gap-6 py-6">
            <h2 className="text-[#C5C5C5] text-xl">
                {t('createNewHabit_fourthStep_color')}:
            </h2>
            <Select
                variant="faded"
                required
                selectionMode="single"
                // Controlamos el selection para que NUNCA esté vacío
                selectedKeys={[current]}
                onSelectionChange={(keys) => {
                    // Si intentan deseleccionar todo, ignoramos
                    if (keys.size === 0) return;
                    setColor(keys);
                }}
                startContent={<ColoredDot color={new Set([current])} />}
            >
                <SelectItem key="#82669A">
                    {t('createNewHabit_fourthStep_violet')}
                </SelectItem>
                <SelectItem key="#668C9A">
                    {t('createNewHabit_fourthStep_green')}
                </SelectItem>
                <SelectItem key="#7D9A66">
                    {t('createNewHabit_fourthStep_yellow')}
                </SelectItem>
            </Select>
        </div>
    );
}

export default CreateNewHabitFourthStep;
