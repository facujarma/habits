import React from 'react'

function HabitStats({ maxStreak, totalCompletitions, completionPercentage }) {
  return (
    <div className='w-full h-40 py-2 flex items-center justify-between gap-12'>
      <div className="w-full aspect-square bg-[#242424] border border-[#616161] rounded-2xl flex flex-col items-center">
        <p className='text-lg text-[#B3B3B3] text-center w-full py-2'> Mayor racha:</p>
        <span className='text-5xl text-white flex-1 flex items-center'> {maxStreak} </span>
        <p className='text-lg text-[#B3B3B3] text-center w-full py-2'> Días</p>
      </div>
      <div className="w-full aspect-square bg-[#242424] border border-[#616161] rounded-2xl flex flex-col items-center">
        <p className='text-lg text-[#B3B3B3] text-center w-full py-2'> Total de completados:</p>
        <span className='text-5xl text-white flex-1 flex items-center'> {totalCompletitions} </span>
        <p className='text-lg text-[#B3B3B3] text-center w-full py-2'> veces</p>
      </div>
      <div className="w-full aspect-square bg-[#242424] border border-[#616161] rounded-2xl flex flex-col items-center">
        <p className='text-lg text-[#B3B3B3] text-center w-full py-2'> Indice de completitud: </p>
        <span className='text-5xl text-white flex-1 flex items-center'> {completionPercentage} </span>
        <p className='text-lg text-[#B3B3B3] text-center w-full py-2'> porciento</p>
      </div>

    </div>
  )
}

export default HabitStats