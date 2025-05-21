import { hexToRgba } from "@root/utils/color";

function CreateNewHabitFirstStep({ habitDescriptiveInfo, setHabitDescriptiveInfo, colorSet }) {
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

                <span className="text-stone-300 text-base">I want to </span>
                <input
                    value={habitDescriptiveInfo?.name || ""}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="max-w-48 h-6 bg-black/40 rounded-md text-stone-300 px-1"
                    placeholder="Habit"
                />

                <span className="text-stone-300 text-base">, </span>
                <input
                    value={habitDescriptiveInfo?.when || ""}
                    onChange={(e) => handleChange("when", e.target.value)}
                    className="max-w-48 h-6 bg-black/40 rounded-md text-stone-300 px-1"
                    placeholder="When"
                />

                <span className="text-stone-300 text-base">so I can be </span>
                <input
                    value={habitDescriptiveInfo?.personToBe || ""}
                    onChange={(e) => handleChange("personToBe", e.target.value)}
                    className="max-w-48 h-6 bg-black/40 rounded-md text-stone-300 px-1"
                    placeholder="Person I want to become"
                />

            </div>
        </div>
    );
}

export default CreateNewHabitFirstStep;
