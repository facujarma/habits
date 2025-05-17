import { motion } from "motion/react"
function ActionBox({ icon, text, handleClick }) {

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      onClick={handleClick}
      className="p-2 relative w-36 min-w-30 aspect-square bg-[#242424] border border-[#616161] rounded-2xl flex flex-col items-center justify-center cursor-pointer">
      <div className="w-16 aspect-square flex items-center justify-center ">
        {icon}
      </div>
      <span className="text-white text-wrap text-center">{text}</span>
    </motion.div>
  )
}

export default ActionBox