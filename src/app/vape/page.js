import PuffButton from '@components/PuffButton'
import PuffTodayCounting from '@root/components/PuffTodayCounting'
import NewsList from '@sections/NewsList'
import { PuffProvider } from '@root/context/puffContext'
import React from 'react'
import { userIsInProgram } from '@root/utils/vape'
import { redirect } from 'next/navigation'
import VapeMessage from '@root/sections/VapeMessage'

async function getIsInProgram() {
  const isInProgram = await userIsInProgram();
  return isInProgram;
}

async function page() {

  const isInProgram = await getIsInProgram();
  if (!isInProgram) {
    redirect('/vape/start');
  }

  return (
    <div className='lg:max-h-full flex flex-col lg:overflow-y-auto'>
      <PuffProvider>
        <PuffTodayCounting />
        <PuffButton />
        <VapeMessage />
      </PuffProvider>

      <NewsList />

    </div>
  )
}

export default page