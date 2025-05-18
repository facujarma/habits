import React from 'react'

function HabitStats({ maxStreak, totalCompletitions, completionPercentage }) {
  return (
    <div className="w-full h-full flex gap-4 overflow-x-auto">
      <div className="min-w-36 max-h-full aspect-square bg-[#242424] border border-[#616161] rounded-2xl flex flex-col items-center">
        <p className='text-base text-[#B3B3B3] text-center w-full py-1 text-wrap'> Longest Streak:</p>
        <span className='text-5xl text-white flex-1 flex items-center'> {maxStreak} </span>
        <p className='text-base text-[#B3B3B3] text-center w-full py-1'> days</p>
      </div>
      <div className="min-w-36 max-h-full aspect-square bg-[#242424] border border-[#616161] rounded-2xl flex flex-col items-center">
        <p className='text-base text-[#B3B3B3] text-center w-full py-1 text-wrap'> Total completions:</p>
        <span className='text-5xl text-white flex-1 flex items-center'> {totalCompletitions} </span>
        <p className='text-base text-[#B3B3B3] text-center w-full py-1'> times</p>
      </div>
      <div className="min-w-36 max-h-full aspect-square bg-[#242424] border border-[#616161] rounded-2xl flex flex-col items-center">
        <p className='text-base text-[#B3B3B3] text-center w-full py-1 text-wrap'> Completion: </p>
        <span className='text-5xl text-white flex-1 flex items-center'> {completionPercentage} </span>
        <p className='text-base text-[#B3B3B3] text-center w-full py-1'> percent</p>
      </div>

    </div>
  )
}

export default HabitStats