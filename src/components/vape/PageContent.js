'use client'

import StopVapingBenefitCard from '@vape/StopVapingBenefitCard'
import StopVapingButton from '@vape/StopVapingButton'
import Header from '@sections/Header'
import { useTranslation } from 'react-i18next'

function PageContent() {
    const { t } = useTranslation('common')

    return (
        <div className="flex flex-col relative">
            <Header title={t('stop_vaping_title')} text={t('stop_vaping_description')} />
            <p className="-mt-2 text-[#C5C5C5] text-base leading-6">{t('stop_vaping_help')}</p>
            <div className="z-0 w-[200%] absolute aspect-square top-1/4 left-1/2 -translate-x-1/2 bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_#164686_0%,_rgba(21.84,_70.28,_133.63,_0)_100%)] rounded-full"></div>
            <h2 className="text-xl text-[#C5C5C5] py-4">{t('benefits_title')}</h2>
            <div className="flex flex-col gap-4">
                <StopVapingBenefitCard title={t('benefit_lung_title')} text={t('benefit_lung_text')} />
                <StopVapingBenefitCard title={t('benefit_heart_title')} text={t('benefit_heart_text')} />
                <StopVapingBenefitCard title={t('benefit_save_money_title')} text={t('benefit_save_money_text')} />
            </div>
            <StopVapingButton />
        </div>
    )
}

export default PageContent
