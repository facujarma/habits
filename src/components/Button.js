import { motion } from "motion/react"
function Button({ text, icon, handleClick }) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="w-full h-14 bg-[#242424] rounded-2xl border border-[#616161] flex items-center justify-center gap-2">
            {
                icon &&
                <span className="w-6 h-6 block text-[#C5C5C5]">
                    {icon}
                </span>
            }
            <span className="text-[#C5C5C5] text-xl">
                {text}
            </span>
        </motion.button>
    )
}

export default Button