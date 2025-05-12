import { useDisclosure } from "@heroui/modal";
import AddTimeModal from "./AddTimeModal";

function CreateNewHabitThirdStep({ setHabitTimes, habitTimes }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className="w-full flex flex-col gap-6 py-6">
            <h2 className="text-[#C5C5C5] text-xl">Hora:</h2>

            <div className="w-full flex items-center gap-4">

                <button
                    onClick={() => {
                        onOpen();
                        console.log("Clicked!!")
                    }}
                    className="w-28 px-4 py-2 bg-[#242424] rounded-full border border-[#616161] text-[#C5C5C5] text-sm">
                    Añadir
                </button>
                <AddTimeModal isOpen={isOpen} onOpenChange={onOpenChange} onOpen={onOpen} />
                <ul>
                </ul>
            </div>
        </div>
    )
}

export default CreateNewHabitThirdStep