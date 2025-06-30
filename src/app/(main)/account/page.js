'use client'

import DangerZone from '@root/components/account/DangerZone'
import ShareStats from '@root/components/account/ShareStats'
import Thanks from '@root/components/account/Thanks'
import SeparatorLine from '@root/components/SeparatorLine'
import Header from '@root/sections/Header'
import { IconArrowRight } from '@tabler/icons-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Page() {
    const { t } = useTranslation('common')

    return (
        <div className='w-full h-full'>
            <Header
                title={t('account_header_title')}
                text={t('account_header_text')}
            />
            <h2 className="text-[#C5C5C5] text-2xl mt-4">
                {t('your_information')}
            </h2>
            <ShareStats />
            <SeparatorLine />
            <a
                href='/account/settings'
                className="mt-6 w-full h-12 bg-[#242424] rounded-2xl flex items-center justify-center gap-2"
            >
                {t('go_to_general_settings')} <IconArrowRight />
            </a>
            <Thanks />
            <SeparatorLine />
            <DangerZone />
        </div>
    )
}

export default Page
