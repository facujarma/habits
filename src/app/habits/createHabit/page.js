'use client'
import CreateNewHabitFirstStep from "@/components/CreateNewHabitFirstStep"
import CreateNewhabitSecondStep from "@/components/CreateNewhabitSecondStep"
import CreateNewHabitThirdStep from "@/components/CreateNewHabitThirdStep"
import SeparatorLine from "@/components/SeparatorLine"
import Header from "@/sections/Header"
import Button from "@/components/Button"
import { IconCirclePlus } from "@tabler/icons-react"
import { useState } from "react"
import { addHabit } from "@root/utils/habits"
import { addToast } from "@heroui/react";

function page() {

  const [habitDescriptiveInfo, setHabitDescriptiveInfo] = useState({
    name: '',
    when: '',
    personToBe: ''
  })
  const [habitDays, setHabitDays] = useState({
    M: false,
    Tu: false,
    W: false,
    Th: false,
    F: false,
    Sa: false,
    Su: false
  })
  const [habitTimes, setHabitTimes] = useState([])

  const handleCreateHabit = async (e) => {
    e.preventDefault();
    console.log(habitDescriptiveInfo, habitDays, habitTimes)
    const promise = addHabit({
      name: habitDescriptiveInfo.name,
      when: habitDescriptiveInfo.when,
      personToBe: habitDescriptiveInfo.personToBe,
      weekdays: habitDays,
      times: habitTimes
    });

    addToast({
      title: "Crear habito",
      description: "Por favor espera mientras se crea el hábito.",
      promise,
      timeout: 2000
    });

    try {
      await promise;
      addToast({
        title: "Hábito creado",
        description: "El hábito se ha creado correctamente.",
        color: "success",
        timeout: 2000
      })
    } catch (e) {
      addToast({
        title: "Error",
        description: "Ha ocurrido un error al crear el hábito.",
        color: "danger",
        timeout: 2000
      })

    }
  };



  return (
    <div className="w-full h-full">
      <Header title={"Create a new Habit"} text={"The best way to start a habit is by completing the following phrase:"} />
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