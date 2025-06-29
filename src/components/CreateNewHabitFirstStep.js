'use client'

import { hexToRgba } from "@lib/color";
import { useTranslation } from "react-i18next";

function CreateNewHabitFirstStep({ plural = false, habitDescriptiveInfo, setHabitDescriptiveInfo, colorSet }) {
    const { t } = useTranslation('common')

    const handleChange = (field, value) => {
        setHabitDescriptiveInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const color = Array.from(colorSet)[0];
    const backgroundColor = hexToRgba(color, 0.37);

    return (
        <div className="w-full flex flex-col gap-6 pb-6">
            <div
                className="w-full border rounded-xl p-3 flex gap-2 items-baseline flex-wrap"
                style={{ backgroundColor, borderColor: color }}
            >
                <span className="text-stone-300 text-base">
                    {plural ? t('createNewHabit_firstStep_weWantTo') : t('createNewHabit_firstStep_iWantTo')}{" "}
                </span>
                <input
                    value={habitDescriptiveInfo?.name || ""}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="max-w-48 h-6 bg-black/40 rounded-md text-stone-300 px-1"
                    placeholder={t('createNewHabit_firstStep_habit_placeholder')}
                />
                <span className="text-stone-300 text-base">{t('createNewHabit_firstStep_comma')} </span>
                <input
                    value={habitDescriptiveInfo?.when || ""}
                    onChange={(e) => handleChange("when", e.target.value)}
                    className="max-w-48 h-6 bg-black/40 rounded-md text-stone-300 px-1"
                    placeholder={t('createNewHabit_firstStep_when_placeholder')}
                />
                <span className="text-stone-300 text-base">
                    {plural ? t('createNewHabit_firstStep_soWeCanBe') : t('createNewHabit_firstStep_soICanBe')}{" "}
                </span>
                <input
                    value={habitDescriptiveInfo?.personToBe || ""}
                    onChange={(e) => handleChange("personToBe", e.target.value)}
                    className="max-w-48 h-6 bg-black/40 rounded-md text-stone-300 px-1"
                    placeholder={plural ? t('createNewHabit_firstStep_peopleWeWantToBecome') : t('createNewHabit_firstStep_personIWantToBecome')}
                />
            </div>
        </div>
    );
}

export default CreateNewHabitFirstStep;
