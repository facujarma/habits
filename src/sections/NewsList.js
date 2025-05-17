import NewCard from '@root/components/NewCard'
import React from 'react'

function NewsList() {
    return (
        <div className='flex flex-col gap-2 py-4 mt-6'>
            <h3 className='justify-start text-[#C5C5C5] text-xl font-normal'> Latest news: </h3>
            <div className='flex flex-col gap-4 py-4'>
                <NewCard title={"El uso constante del vaporizador puede derivar en enfermedades graves"} text={"lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quae."} author={"Facundo Jarma"} />
            </div>
        </div>
    )
}

export default NewsList