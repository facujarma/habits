import React from 'react'
import * as TablerIcons from "@tabler/icons-react";

function IconRenderer({ iconName, color, size = 28 }) {

    const Icon = TablerIcons[iconName];

    return (
        <div className='w-fit aspect-square p-2'>
            {Icon && <Icon size={size} className={`text-${color}`} />}
        </div>
    )
}

export default IconRenderer