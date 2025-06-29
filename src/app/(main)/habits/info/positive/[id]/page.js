'use client'

import { use } from "react"
import { HabitsProvider } from "@/context/habitContext"
import HabitsAllInfo from "@habits/HabitsAllInfo"
import AdviceEditHabitPage from "@sections/AdviceEditHabitPage"
import { useTranslation } from "react-i18next"

export default function Page({ params }) {
    const { id } = use(params) // Destructure params
    const { t } = useTranslation('common')

    const advices = [
        {
            id: 1,
            title: t('advice_easyStart_title'),
            description: t('advice_easyStart_description'),
        },
        {
            id: 2,
            title: t('advice_startSmall_title'),
            description: t('advice_startSmall_description'),
        },
        {
            id: 3,
            title: t('advice_pairWithExisting_title'),
            description: t('advice_pairWithExisting_description'),
        },
        {
            id: 4,
            title: t('advice_makeEnjoyable_title'),
            description: t('advice_makeEnjoyable_description'),
        },
        {
            id: 5,
            title: t('advice_removeBarriers_title'),
            description: t('advice_removeBarriers_description'),
        },
        {
            id: 6,
            title: t('advice_planAhead_title'),
            description: t('advice_planAhead_description'),
        },
    ]

    return (
        <div className="w-full h-full">
            <HabitsProvider>
                <HabitsAllInfo habitID={id} />
                <AdviceEditHabitPage advices={advices} />
            </HabitsProvider>
        </div>
    )
}
