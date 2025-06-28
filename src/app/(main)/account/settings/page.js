'use client'

import { useDisclosure } from '@heroui/modal'
import ChangeLanguageModal from '@root/components/account/ChangeLanguageModal'
import SettingItem from '@root/components/account/SettingItem'
import Header from '@root/sections/Header'
import { IconCirclePlus, IconLanguage, IconMailExclamation, IconMailUp, IconShare2, IconSun, IconVersions } from '@tabler/icons-react'
import React from 'react'


function page() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div>
            <Header title="Settings" text="Manage your account settings." />
            <ul className='flex flex-col gap-2'>
                <li className='text-[#C5C5C5] text-xl'>
                    General settings
                </li>
                <SettingItem text="Change app language (quotes only)" icon={<IconLanguage />} handleClick={() => { onOpen() }} />
                <ChangeLanguageModal isOpen={isOpen} onOpenChange={onOpen} />

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
                <SettingItem text="Share with your friends" icon={<IconShare2 />} handleClick={() => { }} />
                <SettingItem text="Request a feature" description={"Send me an email."} icon={<IconCirclePlus />}
                    handleClick={() => { window.location.href = "mailto:facundojarma@gmail.com?subject=Requesting%20a%20Feature%20In%20Habits" }} />
                <SettingItem text="App version" description={"1.0.0"} icon={<IconVersions />} />
            </ul>
        </div>
    )
}

export default page