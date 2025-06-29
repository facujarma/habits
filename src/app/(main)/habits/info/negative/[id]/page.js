'use client'

import { use } from "react"
import NegativeAllInfo from "@negativeHabits/NegativeAllInfo"
import { NegativeHabitsProvider } from "@root/context/negativeHabitContext"
import AdviceEditHabitPage from "@sections/AdviceEditHabitPage"
import { useTranslation } from "react-i18next"
import { useMemo } from "react"

export default function Page({ params }) {
    const { id } = use(params)
    const { t } = useTranslation('common')

    const advices = useMemo(() => [
        {
            id: 1,
            title: t('advice_surroundWithRoleModels_title'),
            description: t('advice_surroundWithRoleModels_description'),
        },
        {
            id: 2,
            title: t('advice_removeTriggers_title'),
            description: t('advice_removeTriggers_description'),
        },
        {
            id: 3,
            title: t('advice_changeEnvironment_title'),
            description: t('advice_changeEnvironment_description'),
        },
        {
            id: 4,
            title: t('advice_partnerUp_title'),
            description: t('advice_partnerUp_description'),
        },
    ], [t])

    return (
        <div className="w-full h-full">
            <NegativeHabitsProvider>
                <NegativeAllInfo negativeID={id} />
                <AdviceEditHabitPage advices={advices} />
            </NegativeHabitsProvider>
        </div>
    )
}
