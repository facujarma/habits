'use client'

import React, { useState } from 'react'
import CreateNewNegativeFirstStep from '@components/CreateNewNegativeFirstStep'
import Header from '@sections/Header'
import SeparatorLine from '@components/SeparatorLine'
import CreateNewHabitFourthStep from '@components/CreateNewHabitFourthStep'
import Button from '@components/Button'
import { IconCirclePlus } from '@tabler/icons-react'
import { addNegativeHabit } from '@lib/negativeHabit'
import { addToast } from '@heroui/toast'
import { useTranslation } from 'react-i18next'

function Page() {
    const { t } = useTranslation('common')

    const [habitDescriptiveInfo, setHabitDescriptiveInfo] = useState({
        badHabit: "",
        goodHabit: ""
    })
    const [color, setColor] = useState(new Set(["#668C9A"]))

    const handleCreateNegative = async (e) => {
        e.preventDefault();
        const promise = addNegativeHabit({
            badHabit: habitDescriptiveInfo.badHabit,
            goodHabit: habitDescriptiveInfo.goodHabit,
            color: Array.from(color)[0]
        });

        addToast({
            title: t('createNewNegative_page_title'),
            description: t('toast_createNewNegative_pleaseWait'),
            promise,
            timeout: 2000
        });

        try {
            await promise;
            addToast({
                title: t('createNewNegative_page_title'),
                description: t('toast_createNewNegative_success'),
                color: "success",
                timeout: 2000
            })
        } catch (e) {
            addToast({
                title: t('createNewNegative_page_title'),
                description: t('toast_createNewNegative_error'),
                color: "danger",
                timeout: 2000
            })
        }
    }

    return (
        <div className="w-full h-full mb-10">
            <Header
                title={t('createNewNegative_page_title')}
                text={t('createNewNegative_page_text')}
            />
            <CreateNewNegativeFirstStep
                habitDescriptiveInfo={habitDescriptiveInfo}
                setHabitDescriptiveInfo={setHabitDescriptiveInfo}
                colorSet={color}
            />
            <SeparatorLine />
            <div className="w-full flex flex-col gap-4 py-6">
                <h2 className="text-[#C5C5C5] text-xl ">{t('createNewNegative_page_frequency_title')}:</h2>
                <p className='text-[#C5C5C5] text-base'>{t('createNewNegative_page_frequency_text')}</p>
            </div>
            <SeparatorLine />
            <CreateNewHabitFourthStep color={color} setColor={setColor} />
            <Button icon={<IconCirclePlus />} text={t('createNewNegative_page_create_button')} handleClick={handleCreateNegative} />
        </div>
    )
}

export default Page
