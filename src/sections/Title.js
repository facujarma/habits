import React from 'react'
import ExpansibleMenu from './ExpansibleMenu'
function Title() {
    return (
        <div className="relative m-4 flex items-center gap-2 justify-between">
            <h1 className="text-white text-2xl font-bold ">
                <a href="/habits">Habits.</a>
            </h1>
            <ExpansibleMenu />
        </div>
    )
}

export default Title