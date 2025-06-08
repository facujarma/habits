'use client'

import React from 'react'
import SuggestedQuestionCard from './SuggestedQuestionCard';

function SuggestedQuestions() {

    const questions = [
        "What am I grateful for today?",
        "What emotions am I feeling right now?",
        "What’s something I’m proud of recently?",
        "What’s been challenging me lately?",
        "What’s one small goal I can set for today?",
        "Who made a positive impact on me this week?"
    ];

    return (
        <div className='mb-4'>
            <h2 className='text-xl text-[#C5C5C5]'>Not sure what to write? Try answering one of these questions.</h2>
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