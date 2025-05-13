function HabitContainer({ habitName, habitIcon, personToBe }) {
  return (
    <div className="w-full h-24 flex items-center gap-6 ">
      <button className="w-10 aspect-square bg-[#242424] border border-[#616161] rounded-full">
      </button>
      <div className="flex items-center p-3 h-full w-full bg-[#242424] border border-[#616161] rounded-xl cursor-pointer">

        <div className="w-full flex flex-col">
          <h3 className="text-2xl font-bold text-[#C5C5C5]">
            {habitName}
          </h3>
          <span className="text-base text-[#C5C5C5]"> {personToBe} </span>
        </div>
      </div>

    </div>
  )
}

export default HabitContainer