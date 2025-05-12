'use client'
import CreateNewHabitFirstStep from "@/components/CreateNewHabitFirstStep"
import CreateNewhabitSecondStep from "@/components/CreateNewhabitSecondStep"
import CreateNewHabitThirdStep from "@/components/CreateNewHabitThirdStep"
import SeparatorLine from "@/components/SeparatorLine"
import Header from "@/sections/Header"
import Button from "@/components/Button"
import { IconCirclePlus } from "@tabler/icons-react"
import { useState } from "react"

function page() {

  const [habitDescriptiveInfo, setHabitDescriptiveInfo] = useState('')
  const [habitDays, setHabitDays] = useState({
    L: false,
    M: false,
    X: false,
    J: false,
    V: false,
    S: false,
    D: false
  })
  const [habitTimes, setHabitTimes] = useState('')

  const handleCreateHabit = (e) => {
    e.preventDefault()
    console.log(habitDescriptiveInfo, habitDays, habitTimes)
  }


  return (
    <div className="w-full h-full">
      <Header title={"Crear un nuevo habito"} text={"La forma mas inteligente de iniciar un habito efectivo es completando la siguiente frase"} />
      <CreateNewHabitFirstStep habitDescriptiveInfo={habitDescriptiveInfo} setHabitDescriptiveInfo={setHabitDescriptiveInfo} />
      <SeparatorLine />
      <CreateNewhabitSecondStep setHabitDays={setHabitDays} habitDays={habitDays} />
      <SeparatorLine />
      <CreateNewHabitThirdStep setHabitTimes={setHabitTimes} habitTimes={habitTimes} />
      <Button icon={<IconCirclePlus />} text={"Crear"} handleClick={handleCreateHabit} />
    </div>
  )
}

export default page