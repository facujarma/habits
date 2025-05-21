import NegativeAllInfo from "@root/components/NegativeAllInfo"
import AdviceEditHabitPage from "@root/sections/AdviceEditHabitPage"
export default async function Page({ params }) {
    const { id } = await params

    return (
        <div className="w-full h-full">
            <NegativeAllInfo negativeID={id} />
            <AdviceEditHabitPage />
        </div>
    )
}