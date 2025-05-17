import React from 'react'

function StopVapingBenefitCard( {title, text } ) {
  return (
    <div className='z-10 bg-[#666F9A]/40 border-2 border-[#666F9A] rounded-2xl flex flex-col gap-2 w-full justify-center px-4 py-2'>
        <h3 className='font-bold text-white text-base'> {title} </h3>
        <p className='text-white text-sm'> {text} </p>
    </div>
  )
}

export default StopVapingBenefitCard