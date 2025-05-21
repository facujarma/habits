import HabitInfoTitle from "@/components/HabitInfoTitle"
import { HabitsProvider } from "@/context/habitContext"
import HabitsAllInfo from "@root/components/HabitsAllInfo"
import AdviceEditHabitPage from "@root/sections/AdviceEditHabitPage"
export default async function Page({ params }) {
    const { id } = await params
    
    return (
        <div className="w-full h-full">
            <HabitsAllInfo habitID={id} />
            <AdviceEditHabitPage />
        </div>
    )
}