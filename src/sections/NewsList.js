import NewCard from '@quotes/NewCard'
import React from 'react'

function NewsList() {
    return (
        <div className='flex flex-col gap-2 py-4 mt-6'>
            <h3 className='justify-start text-[#C5C5C5] text-xl font-normal'> Latest news: </h3>
            <p>Please, if reading this news makes you anxious, don't read them. Our goal is not to make you anxious. </p>
            <div className='flex flex-col gap-8 py-4'>
                <NewCard title={"Cómo gestionar tu primer día sin vapear"} text={"Tu primer día sin vapear puede ser difícil. Aquí tienes cinco pasos para que dejar de vapear sea un poco más fácil."} author={"smokefree.gov"} />
                <NewCard title={"Cómo dejar de vapear"} text={"Dejar de vapear puede ser más fácil si te preparas con antelación y tienes un plan. Descubre qué pasos puedes seguir para prepararte para dejar de vapear."} author={"smokefree.gov"} />
                <NewCard title={"Dejar de vapear en 2025: Consejos y recursos clave"} text={"2025 podría ser el año para que tú o un ser querido deje de vapear. "} author={"truthinitiative.org"} />
                <NewCard title={"Apoyo para dejar de vapear."} author={"health.nsw.gov.au"} />
            </div>
        </div>
    )
}

export default NewsList