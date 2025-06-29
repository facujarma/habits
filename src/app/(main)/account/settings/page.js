'use client'

import { useDisclosure } from '@heroui/modal'
import { addToast } from '@heroui/toast'
import ChangeLanguageModal from '@root/components/account/ChangeLanguageModal'
import SettingItem from '@root/components/account/SettingItem'
import Header from '@root/sections/Header'
import { IconCirclePlus, IconLanguage, IconMailExclamation, IconMailUp, IconRefresh, IconShare2, IconSun, IconVersions } from '@tabler/icons-react'
import React from 'react'


function page() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const handleShare = async () => {
        const shareData = {
            title: 'Habits.',
            text: 'Check out Habits, a great app to track your habits!',
            url: "https://habits-theta-five.vercel.app",
        };

        const isMobile = /Mobi|Android/i.test(navigator.userAgent);

        if (navigator.share && isMobile) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                addToast({ title: "Error", description: "There was an error sharing the link.", color: "danger", timeout: 2000 })
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareData.url);
                addToast({ title: "Copied", description: "Link copied to clipboard.", color: "success", timeout: 2000 })
            } catch (err) {
                addToast({ title: "Error", description: "There was an error copying the link.", color: "danger", timeout: 2000 })
            }
        }
    };

    return (
        <div>
            <Header title="Settings" text="Manage your account settings." goBack='/account' />
            <ul className='flex flex-col gap-4'>
                <li className='text-[#C5C5C5] text-xl'>
                    General settings
                </li>
                <SettingItem text="Change app language (quotes only)" icon={<IconLanguage />} handleClick={() => { onOpen() }} />
                <ChangeLanguageModal isOpen={isOpen} onOpenChange={onOpenChange} />

                <SettingItem text="Change app theme" icon={<IconSun />} handleClick={() => { }} />
                <SettingItem text="Found a bug?" description={"It helps us a lot if you send me an email."} icon={<IconMailUp />}
                    handleClick={() => { window.location.href = "mailto:facundojarma@gmail.com?subject=Bug%20Report%20In%20Habits" }} />

                <li className='text-[#C5C5C5] text-xl'>
                    User settings
                </li>
                <SettingItem text="Change Email" icon={<IconMailExclamation />} handleClick={() => { }} />
                <li className='text-[#C5C5C5] text-xl'>
                    App info
                </li>
                <SettingItem text="Share with your friends" icon={<IconShare2 />} handleClick={() => { handleShare() }} />
                <SettingItem text="Request a feature" description={"Send me an email."} icon={<IconCirclePlus />}
                    handleClick={() => { window.location.href = "mailto:facundojarma@gmail.com?subject=Requesting%20a%20Feature%20In%20Habits" }} />
                <SettingItem text="Clear cache" description={"This only reset local data, not the server."} icon={<IconRefresh />} handleClick={
                    () => {
                        localStorage.clear()
                        sessionStorage.clear()
                    }
                } />

                <SettingItem text="App version" description={"1.0.0"} icon={<IconVersions />} />
            </ul>
        </div>
    )
}

export default page