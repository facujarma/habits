"use client";

import React, { useState } from "react";
import * as TablerIcons from "@tabler/icons-react";
import { iconList } from "@lib/icons";
import { useTranslation } from "react-i18next";

function CreateNewHabitFifthStep({ onSelect, overflow = false }) {
    const { t } = useTranslation('common');
    const [selected, setSelected] = useState(null);

    const handleSelect = (iconName) => {
        setSelected(iconName);
        onSelect?.(iconName);
    };

    return (
        <ul className={`w-full flex flex-wrap gap-2 p-2 ${overflow ? "max-h-[120px] overflow-y-auto" : ""}`}>
            {iconList.map((iconName) => {
                const Icon = TablerIcons[iconName];
                const isSelected = selected === iconName;
                return (
                    <button
                        key={iconName}
                        onClick={() => handleSelect(iconName)}
                        aria-label={`${t('createNewHabit_fifthStep_selectIcon')} ${iconName}`}
                        title={`${t('createNewHabit_fifthStep_selectIcon')} ${iconName}`}
                        className={`cursor-pointer w-[60px] h-[60px] flex items-center justify-center border rounded-xl transition-all
              ${isSelected ? "border-[#82669A] bg-[#82669A]/40" : "hover:border-[#82669A] border-[#616161]"}`}
                    >
                        {Icon && <Icon size={28} />}
                    </button>
                );
            })}
        </ul>
    );
}

export default CreateNewHabitFifthStep;
