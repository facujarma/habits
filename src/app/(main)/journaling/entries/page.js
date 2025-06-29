'use client'

import EntriesList from '@journaling/EntriesList'
import Header from '@sections/Header'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Page() {
    const { t } = useTranslation('common')

    return (
        <div>
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="w-[200%] aspect-square absolute top-1/4 left-1/2 -translate-x-1/2 bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_#3B1686_0%,_rgba(22,_70,_134,_0)_100%)] rounded-full" />
            </div>
            <Header
                goBack={"/journaling"}
                title={t('journal_title')}
                text={t('journal_text')}
            />
            <EntriesList />
        </div>
    )
}

export default Page
