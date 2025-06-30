'use client'

import { useDisclosure } from '@heroui/modal'
import { addToast } from '@heroui/toast'
import ChangeLanguageModal from '@root/components/account/ChangeLanguageModal'
import SettingItem from '@root/components/account/SettingItem'
import Header from '@root/sections/Header'
import {
    IconCirclePlus,
    IconLanguage,
    IconMailExclamation,
    IconMailUp,
    IconRefresh,
    IconShare2,
    IconSun,
    IconVersions
} from '@tabler/icons-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Page() {
    const { t } = useTranslation('common')
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const handleShare = async () => {
        const shareData = {
            title: 'Habits.',
            text: 'Check out Habits, a great app to track your habits!',
            url: "https://habits-theta-five.vercel.app",
        }

        const isMobile = /Mobi|Android/i.test(navigator.userAgent)

        if (navigator.share && isMobile) {
            try {
                await navigator.share(shareData)
            } catch (err) {
                addToast({ title: "Error", description: "There was an error sharing the link.", color: "danger", timeout: 2000 })
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareData.url)
                addToast({ title: "Copied", description: "Link copied to clipboard.", color: "success", timeout: 2000 })
            } catch (err) {
                addToast({ title: "Error", description: "There was an error copying the link.", color: "danger", timeout: 2000 })
            }
        }
    }

    return (
        <div>
            <Header title={t("settings")} text={t("settings_description")} goBack='/account' />
            <ul className='flex flex-col gap-4'>
                <li className='text-[#C5C5C5] text-xl'>
                    {t("general_settings")}
                </li>
                <SettingItem text={t("change_language")} icon={<IconLanguage />} handleClick={onOpen} />
                <ChangeLanguageModal isOpen={isOpen} onOpenChange={onOpenChange} />

                <SettingItem text={t("change_theme")} icon={<IconSun />} handleClick={() => { }} />
                <SettingItem
                    text={t("found_bug")}
                    description={t("bug_help")}
                    icon={<IconMailUp />}
                    handleClick={() => {
                        window.location.href = "mailto:facundojarma@gmail.com?subject=Bug%20Report%20In%20Habits"
                    }}
                />

                <li className='text-[#C5C5C5] text-xl'>
                    {t("user_settings")}
                </li>
                <SettingItem text={t("change_email")} icon={<IconMailExclamation />} handleClick={() => { }} />

                <li className='text-[#C5C5C5] text-xl'>
                    {t("app_info")}
                </li>
                <SettingItem text={t("share_app")} icon={<IconShare2 />} handleClick={handleShare} />
                <SettingItem
                    text={t("request_feature")}
                    description={t("feature_help")}
                    icon={<IconCirclePlus />}
                    handleClick={() => {
                        window.location.href = "mailto:facundojarma@gmail.com?subject=Requesting%20a%20Feature%20In%20Habits"
                    }}
                />
                <SettingItem
                    text={t("clear_cache")}
                    description={t("clear_cache_description")}
                    icon={<IconRefresh />}
                    handleClick={() => {
                        localStorage.clear()
                        sessionStorage.clear()
                    }}
                />
                <SettingItem text={t("app_version")} description={"1.0.0"} icon={<IconVersions />} />
            </ul>
        </div>
    )
}

export default Page
