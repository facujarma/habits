import { Select } from '@heroui/react'
import { SelectItem } from '@heroui/select'
import React from 'react'

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
    return (
        <div className="w-full flex flex-col gap-6 py-6">
            <h2 className="text-[#C5C5C5] text-xl">Color:</h2>
            <Select variant='faded' onSelectionChange={setColor}
                startContent={coloredDot(color)}
                defaultSelectedKeys={['#668C9A']}

            >
                <SelectItem key="#82669A">Violet</SelectItem>
                <SelectItem key="#668C9A">Green</SelectItem>
                <SelectItem key="#7D9A66">Yellow</SelectItem>
            </Select>
        </div>
    )
}

export default CreateNewHabitFourthStep