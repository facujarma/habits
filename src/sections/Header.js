function Header({ title, text }) {
    return (
        <div className="w-full flex flex-col gap-2 mb-6">
            <h2 className="text-2xl text-white"> {title} </h2>
            <p className="text-[#C5C5C5] text-lg leading-6">
                {text}
            </p>
        </div>
    )
}

export default Header