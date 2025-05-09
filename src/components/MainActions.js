import ActionBox from "@components/ActionBox"

function MainActions() {
    return (
        <div className="">
            <h2 className="text-[#C5C5C5] text-lg ">Que estas buscando?</h2>
            <div className="flex overflow-auto max-w-full">
                <ActionBox />
                <ActionBox />
                <ActionBox />
            </div>
        </div>
    )
}

export default MainActions