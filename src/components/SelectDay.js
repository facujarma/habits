function SelectDay({ day, isSelected = false, setHabitDays }) {

    const handleClick = () => {
        if (isSelected) {
            setHabitDays(habitDays => ({ ...habitDays, [day]: false }) )
        }
        else {
            setHabitDays(habitDays => ({ ...habitDays, [day]: true }) )
        }
    }

    return (
        <li
            onClick={handleClick}
            className={`w-8 h-8 rounded-full border border-[#616161] flex items-center justify-center text-white  ${isSelected ? 'bg-[#616161]' : 'bg-[#242424]'} `}>
            {day}
        </li>)
}

export default SelectDay