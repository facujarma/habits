import ActionBox from "@components/ActionBox"
import SeparatorLine from "@components/SeparatorLine"
import { IconCirclePlus, IconSmoking } from "@tabler/icons-react"

function MainActions() {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-[#C5C5C5] text-lg ">Que estas buscando?</h2>
            <div className="flex gap-6 overflow-auto max-w-full xl:justify-center pb-2">
                <ActionBox icon={<IconCirclePlus className="w-full h-full text-[#B3B3B3]" />} text={"Crear un habito"} />
                <ActionBox icon={<IconSmoking className="w-full h-full text-[#B3B3B3]" />} text={"Dejar de vapear"} />
                <ActionBox />
            </div>
            <SeparatorLine />
        </div>
    )
}

export default MainActions