import CreateNewHabitFirstStep from "@/components/CreateNewHabitFirstStep"
import CreateNewhabitSecondStep from "@/components/CreateNewhabitSecondStep"
import CreateNewHabitThirdStep from "@/components/CreateNewHabitThirdStep"
import SeparatorLine from "@/components/SeparatorLine"
import Header from "@/sections/Header"

function page() {
  return (
    <div className="w-full">
      <Header title={"Crear un nuevo habito"} text={"La forma mas inteligente de iniciar un habito efectivo es completando la siguiente frase"} />
      <CreateNewHabitFirstStep />
      <SeparatorLine />
      <CreateNewhabitSecondStep />
      <SeparatorLine />
      <CreateNewHabitThirdStep />
    </div>
  )
}

export default page