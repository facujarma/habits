import SelectDay from "@components/SelectDay"
function CreateNewhabitSecondStep({ setHabitDays, habitDays }) {

    const days = ["M", "Tu", "W", "Th", "F", "Sa", "Su"];
    return (
        <div className="w-full flex flex-col gap-6 py-6">
            <h2 className="text-[#C5C5C5] text-xl ">Frequency:</h2>
            <ul className="flex justify-between w-full">
                {
                    days.map((day, index) => {
                        return (
                            <SelectDay key={index} day={day} isSelected={habitDays[day]} setHabitDays={setHabitDays} habitDays={habitDays} />
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default CreateNewhabitSecondStep