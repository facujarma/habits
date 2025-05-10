import DayInfo from "@/components/DayInfo";
import HabitsList from "@components/HabitsList";
import MainActions from "@components/MainActions";
export default function Home() {
  return (

    <div className="py-4">
      <h1 className="text-white text-2xl font-bold">Habits.</h1>
      <DayInfo />
      <MainActions />
      <h2 className="mt-10 text-2xl font-bold text-[#C5C5C5]">Tus Habitos:</h2>
      <HabitsList />
    </div>
  );
}
