import StopVapingBenefitCard from '@root/components/vape/StopVapingBenefitCard'
import StopVapingButton from '@root/components/vape/StopVapingButton'
import Header from '@sections/Header'
import { userIsInProgram } from '@lib/vape'
import { redirect } from 'next/navigation'
import React from 'react'

async function getIsInProgram() {
  const isInProgram = await userIsInProgram();
  return isInProgram;
}

async function page() {

  const isInProgram = await getIsInProgram();
  
  if(isInProgram){
    redirect('/vape')
  }

  return (
    <div className='flex flex-col  relative'>
      <Header title={"Stop vaping"} text={"You can use Habits in many ways—one of them is to quit vaping. The app helps you track your puffs per day and recommends ways to reduce them."} />
      <p className='-mt-2 text-[#C5C5C5] text-base leading-6'>If you are currently a vaper, we can help you overcome your addiction and build a better and healthier habit.</p>
      <div className="z-0 w-[200%] absolute aspect-square top-1/4 left-1/2 -translate-x-1/2  bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_#164686_0%,_rgba(21.84,_70.28,_133.63,_0)_100%)] rounded-full"></div>
      <h2 className='text-xl text-[#C5C5C5] py-4'>Benefits:</h2>
      <div className='flex flex-col gap-4'>
        <StopVapingBenefitCard title={"Improved Lung Health"} text={"Quitting vaping helps your lungs recover and function better."} />
        <StopVapingBenefitCard title={"Better Heart Health"} text={"Stopping vaping reduces your risk of heart disease."} />
        <StopVapingBenefitCard title={"Save Money"} text={"Not buying vape products means more money saved for you."} />
      </div>

      <StopVapingButton />

    </div>
  )
}

export default page