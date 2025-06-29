'use client'

import NewCard from '@quotes/NewCard'
import React from 'react'
import { useTranslation } from 'react-i18next'

function NewsList() {
    const { t } = useTranslation('common')

    const newsItems = [
        {
            title: t('news_1_title'),
            text: t('news_1_text'),
            author: t('news_1_author'),
            href: "https://www.statnews.com/2025/04/23/quitting-vaping-e-cigarettes-varenicline-chantix-young-adults/?utm_source=chatgpt.com"
        },
        {
            title: t('news_2_title'),
            text: t('news_2_text'),
            author: t('news_2_author'),
            href: "https://www.myjournalcourier.com/news/article/vaping-lawsuit-settlement-fund-cessation-20275117.php?utm_source=chatgpt.com"
        },
        {
            title: t('news_3_title'),
            text: t('news_3_text'),
            author: t('news_3_author'),
            href: "https://www.thetimes.co.uk/article/patients-as-young-as-11-treated-at-vaping-clinic-for-children-pxf68b06v?utm_source=chatgpt.com"
        },
        {
            title: t('news_4_title'),
            text: t('news_4_text'),
            author: t('news_4_author'),
            href: "https://www.vox.com/public-health/410443/vaping-conundrum-public-health-youth-ecigarettes?utm_source=chatgpt.com"
        }
    ]

    return (
        <div className="flex flex-col gap-2 py-4 mt-6">
            <h3 className="justify-start text-[#C5C5C5] text-xl font-normal">{t('latest_news')}</h3>
            <p>{t('anxiety_warning')}</p>
            <div className="flex flex-col gap-8 py-4">
                {newsItems.map(({ title, text, author, href }, index) => (
                    <NewCard key={index} title={title} text={text} author={author} href={href} />
                ))}
            </div>
        </div>
    )
}

export default NewsList
