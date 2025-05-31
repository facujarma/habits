import React from 'react'
import RoomHabitContainer from './RoomHabitContainer'

function RoomInfoContainer({ roomInfo, habits }) {
    return (
        <div className='w-full my-4'
            key={roomInfo.id}>
            <div className='w-full'>
                <h2 className='text-3xl text-white font-bold'>{roomInfo.name}</h2>
                <p className='text-base text-[#C5C5C5]'>{roomInfo.description}</p>
            </div>
            <ul>
                {
                    habits.map((habit) => {
                        return (
                            <RoomHabitContainer
                                key={habit.id}
                                habit={habit} />
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default RoomInfoContainer