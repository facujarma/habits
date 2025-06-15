import EntriesList from '@journaling/EntriesList'
import Header from '@sections/Header'
import React from 'react'

function page() {
    return (
        <div>
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="w-[200%] aspect-square absolute top-1/4 left-1/2 -translate-x-1/2 bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_#3B1686_0%,_rgba(22,_70,_134,_0)_100%)] rounded-full" />
            </div>
            <Header goBack={"/journaling"} title={"Your Journal"} text={"In this section, you will find all your journal entries."} />
            <EntriesList />
        </div>
    )
}

export default page