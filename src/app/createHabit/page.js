import CreateNewHabitFirstStep from "@/components/CreateNewHabitFirstStep"
import CreateNewhabitSecondStep from "@/components/CreateNewhabitSecondStep"
import CreateNewHabitThirdStep from "@/components/CreateNewHabitThirdStep"
import SeparatorLine from "@/components/SeparatorLine"

function page() {
  return (
    <div className="w-full">
      <h2 className="text-2xl text-white">Crear un nuevo habito:</h2>
      <CreateNewHabitFirstStep />
      <SeparatorLine />
      <CreateNewhabitSecondStep />
      <SeparatorLine />
      <CreateNewHabitThirdStep />
    </div>
  )
}

export default page