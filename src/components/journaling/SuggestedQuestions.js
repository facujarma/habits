'use client'

import React from 'react'
import SuggestedQuestionCard from './SuggestedQuestionCard'
import { useTranslation } from 'react-i18next'

function SuggestedQuestions() {
    const { t } = useTranslation('common')

    const questions = [
        t("suggestedQuestion_1"),
        t("suggestedQuestion_2"),
        t("suggestedQuestion_3"),
        t("suggestedQuestion_4"),
        t("suggestedQuestion_5"),
        t("suggestedQuestion_6"),
    ]

    return (
        <div className='mb-4'>
            <h2 className='text-xl text-[#C5C5C5]'>{t("suggestedQuestions_title")}</h2>
            <ul className='flex gap-2 w-full mt-2 overflow-x-auto py-5'>
                {
                    questions.map((question) => {
                        return <SuggestedQuestionCard question={question} key={question} />
                    })
                }
            </ul>
        </div>
    )
}

export default SuggestedQuestions
