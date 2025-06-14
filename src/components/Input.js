function Input({ label, placeholder, isPassword = false, setText, defaultValue, disabled = false, type = 'text' }) {
    return (
        <div className="flex flex-col gap-1 mb-2">
            <label className='text-[#C5C5C5] text-lg font-bold'>{label}</label>
            <input name={label} type={isPassword ? 'password' : type} placeholder={placeholder}

                onChange={(e) => setText(e.target.value)}
                defaultValue={defaultValue}
                disabled={disabled}
                className="text-[#C5C5C5] text-base h-12 bg-[#242424] rounded-2xl border border-[#616161] px-2 py-1" />
        </div>
    )
}

export default Input