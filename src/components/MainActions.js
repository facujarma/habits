'use client'

import ActionBox from "@components/ActionBox"
import { IconBook, IconCirclePlus, IconQuote, IconSmoking, IconTextCaption, IconWeight } from "@tabler/icons-react"
import { redirect } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import useI18nReady from '@root/hooks/UseI18nReady'
import '@i18n/client'

function MainActions() {
    const { t } = useTranslation('common')
    const ready = useI18nReady()

    if (!ready) return null // o algún loading placeholder

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-[#C5C5C5] text-lg">{t("mainActionQuestion")}</h2>
            <div className="flex gap-6 overflow-x-auto max-w-full py-2">
                <ActionBox
                    handleClick={() => redirect("/habits/createHabit")}
                    icon={<IconCirclePlus className="w-full h-full text-[#B3B3B3]" />}
                    text={t("mainActionHabit")}
                />
                <ActionBox
                    handleClick={() => redirect("/vape/start")}
                    icon={<IconSmoking className="w-full h-full text-[#B3B3B3]" />}
                    text={t("mainActionVape")}
                />
                <ActionBox
                    handleClick={() => redirect("/quotes")}
                    icon={<IconQuote className="w-full h-full text-[#B3B3B3]" />}
                    text={t("mainActionQuote")}
                />
                <ActionBox
                    handleClick={() => redirect("/journaling")}
                    icon={<IconTextCaption className="w-full h-full text-[#B3B3B3]" />}
                    text={t("mainActionJournal")}
                />
                <ActionBox
                    handleClick={() => redirect("/gym")}
                    icon={<IconWeight className="w-full h-full text-[#B3B3B3]" />}
                    text={t("mainActionGym")}
                />
                <ActionBox
                    handleClick={() => redirect("/books")}
                    icon={<IconBook className="w-full h-full text-[#B3B3B3]" />}
                    text={t("mainActionBooks")}
                />
            </div>
        </div>
    )
}

export default MainActions
