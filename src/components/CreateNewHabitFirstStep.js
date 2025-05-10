function CreateNewHabitFirstStep() {
    return (
        <div className="w-full flex flex-col gap-6 pb-6">
            <p className="text-[#C5C5C5] text-lg leading-6 mt-4">
                La forma mas inteligente de iniciar un habito efectivo es completando la siguiente frase:
            </p>
            <div className="w-full min-h-28 bg-[#0A0A0A] border border-[#555555] rounded-xl p-3 flex gap-2 items-baseline flex-wrap">
                
                <span class="text-stone-300 text-base">Yo voy a </span>
                <input className="border border-[#616161] max-w-48 h-6 bg-[#242424] rounded-full text-stone-300 px-1" placeholder="Habito a formar"></input>
                
                <span class="text-stone-300 text-base">, </span>
                <input className="border border-[#616161] max-w-32 h-6 bg-[#242424] rounded-full text-stone-300 px-1" placeholder="Cuando"></input>
                
                <span class="text-stone-300 text-base">para asi convertirme en </span>
                <input className="border border-[#616161] max-w-32 h-6 bg-[#242424] rounded-full text-stone-300 px-1" placeholder="Persona que quiero ser"></input>
            
            </div>
        </div>
    )
}

export default CreateNewHabitFirstStep