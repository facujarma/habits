import SelectDay from "@components/SelectDay"
import { useTranslation } from "react-i18next"

function CreateNewhabitSecondStep({ setHabitDays, habitDays }) {
    const { t } = useTranslation('common')

    const days = ["M", "Tu", "W", "Th", "F", "Sa", "Su"]
    return (
        <div className="w-full flex flex-col gap-6 py-6">
            <h2 className="text-[#C5C5C5] text-xl ">{t('createNewHabit_secondStep_frequency')}:</h2>
            <ul className="flex justify-between w-full">
                {days.map((day) => (
                    <SelectDay
                        key={day}
                        day={day}
                        isSelected={habitDays[day]}
                        setHabitDays={setHabitDays}
                        habitDays={habitDays}
                    />
                ))}
            </ul>
        </div>
    )
}

export default CreateNewhabitSecondStep
