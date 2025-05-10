import HabitContainer from "@components/HabitContainer"

function HabitsList() {
  return (
    <div className="flex flex-col gap-8 pt-6">
        <HabitContainer habitName={"Leer 3 paginas"}/>
        <HabitContainer habitName={"Leer 3 paginas"}/>
        <HabitContainer habitName={"Leer 3 paginas"}/>
    </div>
  )
}

export default HabitsList