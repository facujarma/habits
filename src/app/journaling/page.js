
import { Editor } from "@journaling/DynamicEditor"
import Button from "@components/Button"
import Header from '@sections/Header'
import React from 'react'
import SuggestedQuestions from "@journaling/SuggestedQuestions"
import { TodayEntryProvider } from "@root/context/todayEntryContext"

function page() {


  return (
    <div>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="w-[200%] aspect-square absolute top-1/4 left-1/2 -translate-x-1/2 bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_#3B1686_0%,_rgba(22,_70,_134,_0)_100%)] rounded-full" />
      </div>
      <Header title={"Journaling"} text={"Journaling is a way to record your thoughts and feelings, and to reflect on your life and the people around you. In this section, you’ll be able to write down whatever you're thinking at any time."} />
      <TodayEntryProvider>
        <SuggestedQuestions />
        <Editor />
      </TodayEntryProvider>
    </div>
  )
}

export default page