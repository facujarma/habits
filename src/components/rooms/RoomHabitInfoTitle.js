'use client'

import React from 'react'
import { hexToRgba } from '@lib/color'
import IconRenderer from '@components/IconRenderer'
import { useTranslation } from 'react-i18next'

function RoomHabitInfoTitle({ title, when, personToBe, color, icon }) {
    const { t } = useTranslation('common')
    const backgroundColor = hexToRgba(color, 0.37)

    return (
        <div
            className="w-full rounded-2xl border flex items-center py-4"
            style={{ backgroundColor, borderColor: color }}
        >
            <div className="px-4 py-2 h-full flex flex-col gap-4">
                <IconRenderer iconName={icon} />
            </div>
            <div className="h-full flex-1">
                <h1 className="text-2xl font-bold text-white mb-4">{title}</h1>
                <div>
                    <p className="mb-2 text-sm text-[#E8E8E8]">
                        <b>{t('you_will_do_it')}</b> {when}
                    </p>
                    <p className="mb-2 text-sm text-[#E8E8E8]">
                        <b>{t('because_you_want_to_be')}</b> {personToBe}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RoomHabitInfoTitle
