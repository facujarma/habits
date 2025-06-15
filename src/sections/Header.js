'use client'

import { IconArrowLeft } from "@tabler/icons-react"

function Header({ title, text, goBack = "/habits" }) {
    return (
        <div className="w-full flex flex-col gap-2 mb-6">
            <div className=" flex items-center gap-1">
                <button onClick={() => { window.location.href = goBack }}>
                    <IconArrowLeft className="text-white" size={32} />
                </button>
                <h2 className="text-2xl text-white"> {title} </h2>
            </div>
            <p className="text-[#C5C5C5] text-base leading-6">
                {text}
            </p>
        </div>
    )
}

export default Header