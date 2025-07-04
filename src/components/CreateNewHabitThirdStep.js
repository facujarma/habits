import { useDisclosure } from "@heroui/modal";
import AddTimeModal from "./AddTimeModal";
import SelectedTimeCard from "./SelectedTimeCard";
import { useTranslation } from "react-i18next";

function CreateNewHabitThirdStep({ setHabitTimes, habitTimes }) {
    const { t } = useTranslation('common');
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const addTime = (time) => {
        if (habitTimes.includes(time)) return;
        if (habitTimes.length === 0) {
            setHabitTimes([time]);
            return;
        }
        setHabitTimes([...habitTimes, time]);
    };

    return (
        <div className="w-full flex flex-col gap-6 py-6">
            <h2 className="text-[#C5C5C5] text-xl">{t('createNewHabit_thirdStep_time')}:</h2>

            <div className="w-full flex items-center gap-4">
                <button
                    onClick={() => {
                        onOpen();
                        console.log("Clicked!!");
                    }}
                    className="w-28 px-4 py-2 bg-[#242424] rounded-full border border-[#616161] text-[#C5C5C5] text-sm"
                >
                    {t('createNewHabit_thirdStep_addButton')}
                </button>
                <AddTimeModal isOpen={isOpen} onOpenChange={onOpenChange} onOpen={onOpen} addTime={addTime} />
                <ul className="flex gap-4">
                    {habitTimes?.map((time) => (
                        <SelectedTimeCard key={time} time={time} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CreateNewHabitThirdStep;
