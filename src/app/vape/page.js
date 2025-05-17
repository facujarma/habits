import PuffButton from '@components/PuffButton'
import PuffTodayCounting from '@root/components/PuffTodayCounting'
import NewsList from '@sections/NewsList'
import { PuffProvider } from '@root/context/puffContext'
import React from 'react'

function page() {
  return (
    <div>
      <PuffProvider>
        <PuffTodayCounting />
        <PuffButton />
        <div className='flex flex-col gap-2 w-full items-center mt-12'>
          <h2 className='font-bold text-[#C5C5C5] text-base'>Total Puffs in the week:</h2>
          <span className='font-bold text-white text-2xl'>3123</span>
        </div>
      </PuffProvider>

      <NewsList />

    </div>
  )
}

export default page