import React from 'react'

function AdviceEditHabitPage() {
    const advices = [
        {
            id: 1,
            title: "Make the habit as easy as possible to start.",
            description: "Example: If your habit is working out, lay out your clothes the night before."
        },
        {
            id: 2,
            title: "Start Small (2-Minute Rule)",
            description: "Want to read? Start with 1 page. Want to meditate? Begin with 2 minutes."
        },
        {
            id: 3,
            title: "Pair It With an Existing Habit.",
            description: "Attach the new habit to one you already do."
        },
        {
            id: 4,
            title: "Make It Enjoyable.",
            description: "Use music, a fun app, or turn it into a game. Track progress and celebrate small wins."
        },
        {
            id: 5,
            title: "Remove Barriers.",
            description: "Don’t rely on memory—set reminders or alarms. Uninstall distractions during habit time."
        },
        {
            id: 6,
            title: "Plan Ahead.",
            description: "Know when, where, and how you'll do the habit. 'I’ll write for 5 minutes after lunch at my desk.' Want to meditate? Begin with 2 minutes."
        }
    ]

    return (
        <div>
            <h3 className='text-[#C5C5C5] text-xl mt-16 mb-4'>How to make an habit easier to do?</h3>
            <ul className='flex flex-col gap-4 pb-4'>
                {
                    advices.map((advice) => {
                        return (
                            <li className='w-full bg-[#242424] border border-[#616161] rounded-2xl p-2'>
                                <h3 className='font-bold text-white text-base'> {advice.title} </h3>
                                <p className='text-sm'> {advice.description} </p>
                            </li>
                        )
                    })
                }
            </ul>


        </div>
    )
}

export default AdviceEditHabitPage