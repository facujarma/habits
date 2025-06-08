import { useTodayEntry } from '@root/context/todayEntryContext'
import React from 'react'

function SuggestedQuestionCard({ question }) {

    const { addQuestionToEntry } = useTodayEntry()

    const handleClick = () => {
        addQuestionToEntry(question)
    }

    return (
        <li >
            <button
                onClick={() => handleClick()}
                className='w-full text-nowrap bg-[#242424] border border-[#616161] rounded-2xl p-2'>
                {
                    question
                }
            </button>
        </li>
    )
}

export default SuggestedQuestionCard