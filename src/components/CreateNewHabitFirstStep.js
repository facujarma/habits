function CreateNewHabitFirstStep({ habitDescriptiveInfo, setHabitDescriptiveInfo }) {
    const handleChange = (field, value) => {
        setHabitDescriptiveInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="w-full flex flex-col gap-6 pb-6">
            <div className="w-full min-h-28 bg-[#0A0A0A] border border-[#555555] rounded-xl p-3 flex gap-2 items-baseline flex-wrap">

                <span className="text-stone-300 text-base">I want to </span>
                <input
                    value={habitDescriptiveInfo?.name || ""}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="border border-[#616161] max-w-48 h-6 bg-[#242424] rounded-full text-stone-300 px-1"
                    placeholder="Habit"
                />

                <span className="text-stone-300 text-base">, </span>
                <input
                    value={habitDescriptiveInfo?.when || ""}
                    onChange={(e) => handleChange("when", e.target.value)}
                    className="border border-[#616161] max-w-32 h-6 bg-[#242424] rounded-full text-stone-300 px-1"
                    placeholder="When"
                />

                <span className="text-stone-300 text-base">so I can be </span>
                <input
                    value={habitDescriptiveInfo?.personToBe || ""}
                    onChange={(e) => handleChange("personToBe", e.target.value)}
                    className="border border-[#616161] max-w-32 h-6 bg-[#242424] rounded-full text-stone-300 px-1"
                    placeholder="Person I want to become"
                />

            </div>
        </div>
    );
}

export default CreateNewHabitFirstStep;
