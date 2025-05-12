function ActionBox({ icon, text, handleClick }) {

  return (
    <div 
    onClick={handleClick}
    className="relative min-w-36 aspect-square bg-[#242424] border border-[#616161] rounded-2xl flex flex-col items-center justify-center ">
      <div className="w-16 aspect-square flex items-center justify-center ">
        {icon}
      </div>
      <span className="text-white ">{text}</span>
    </div>
  )
}

export default ActionBox