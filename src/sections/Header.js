import { IconArrowLeft } from "@tabler/icons-react"

function Header({ title, text }) {
    return (
        <div className="w-full flex flex-col gap-2 mb-6">
            <div>
                <h2 className="text-2xl text-white"> {title} </h2>
                
            </div>
            <p className="text-[#C5C5C5] text-base leading-6">
                {text}
            </p>
        </div>
    )
}

export default Header