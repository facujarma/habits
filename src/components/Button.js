function Button({ text, icon, handleClick }) {
    return (
        <button className="w-full h-14 bg-[#242424] rounded-2xl border border-[#616161] flex items-center justify-center gap-2">
            {
                icon &&
                <span className="w-6 h-6 block text-[#C5C5C5]">
                    {icon}
                </span>
            }
            <span className="text-[#C5C5C5] text-xl">
                {text}
            </span>
        </button>
    )
}

export default Button