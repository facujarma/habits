import SelectHabitTypeBlock from '@root/components/SelectHabitTypeBlock'
import Header from '@root/sections/Header'
import React from 'react'

function page() {
    return (
        <div>
            <Header title="Create a new habit:" text="We have two types of habits: positive and negative. Choose the one that best fits your needs." />
            <div className='flex flex-col gap-10'>
                <SelectHabitTypeBlock color={"#82669A"} title={"Create a new positive:"} text={"Create a habit that you’ll need to complete on certain days of the week. We’ll keep track of the days you perform the habit."} goTo={'/habits/createHabit/positive'} />
                <SelectHabitTypeBlock color={"#9A6666"} title={"Create a new negative:"} text={"Create a negative habit — that is, a habit in reverse. All days will be marked as completed by default, and you’ll need to unmark the days on which you actually do the habit."} goTo={'/habits/createHabit/negative'} />
            </div>
        </div>
    )
}

export default page