import React from 'react'
import { hexToRgba } from '@lib/color'

function CreateNewNegativeFirstStep({ habitDescriptiveInfo, setHabitDescriptiveInfo, colorSet }) {
    const handleChange = (field, value) => {
        setHabitDescriptiveInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };


    const color = Array.from(colorSet)[0]
    const backgroundColor = hexToRgba(color, 0.37)

    return (
        <div className="w-full flex flex-col gap-6 pb-6">
            <div className="w-full  border rounded-xl p-3 flex gap-2 items-baseline flex-wrap" style={{ backgroundColor, borderColor: color }}>

                <span className="text-stone-300 text-base">I am going to stop </span>
                <input
                    value={habitDescriptiveInfo?.badHabit || ""}
                    onChange={(e) => handleChange("badHabit", e.target.value)}
                    className="max-w-48 h-6 bg-black/40 rounded-md text-stone-300 px-1"
                    placeholder="the bad habit"
                />

                <span className="text-stone-300 text-base">And instead i will </span>
                <input
                    value={habitDescriptiveInfo?.goodHabit || ""}
                    onChange={(e) => handleChange("goodHabit", e.target.value)}
                    className="max-w-48 h-6 bg-black/40 rounded-md text-stone-300 px-1"
                    placeholder="the good Habit"
                />

            </div>
        </div>
    );
}

export default CreateNewNegativeFirstStep