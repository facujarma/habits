import { userIsInProgram } from '@lib/vape'
import { redirect } from 'next/navigation'
import PageContent from '@vape/PageContent'
import React from 'react'

async function getIsInProgram() {
  const isInProgram = await userIsInProgram()
  return isInProgram
}

async function page() {
  const isInProgram = await getIsInProgram()
  if (isInProgram) {
    redirect('/vape')
  }

  return (
    <PageContent />
  )
}

export default page
