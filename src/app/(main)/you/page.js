'use client'

import React from 'react'
import Carrousel from '@root/components/you/Carrousel'
import GeneralProgress from '@you/GeneralProgress'
import Header from '@sections/Header'
import VapeProgress from '@root/components/you/VapeProgress'
import JournalingWords from '@root/components/you/JournalingWords'
import TimeCompleted from '@root/components/you/TimeCompleted'
import Achivements from '@root/components/you/Achivements'
import ChallengesCompleted from '@root/components/you/ChallengesCompleted'
import { useTranslation } from 'react-i18next'

function Page() {
    const { t } = useTranslation('common')

    return (
        <div>
            <Header title={t('you_title')} text={t('you_description')} />
            <Carrousel>
                <GeneralProgress />
                <TimeCompleted />
                <VapeProgress />
                <ChallengesCompleted />
            </Carrousel>
            <JournalingWords />
            <h2 className="text-2xl text-[#C5C5C5] mt-10">{t('achievements_title')}</h2>
            <Achivements />
        </div>
    )
}

export default Page
