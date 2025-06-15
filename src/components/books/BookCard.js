import { useBooks } from '@root/context/booksContext'
import { IconStar, IconStarFilled } from '@tabler/icons-react'
import React from 'react'

function BookCard({ starsNumber, type, title, description, pages, bookID }) {

    const stars = []
    for (let i = 0; i < starsNumber; i++) {
        stars.push("filled")
    }
    for (let i = starsNumber; i < 5; i++) {
        stars.push("empty")
    }

    const { changeStars } = useBooks()

    return (
        <div className='w-full p-3 min-h-42 bg-[#666F9A]/40 border border-[#666F9A] rounded-2xl flex gap-6'>
            <div className='bg-[#666F9A]/40 border border-[#666F9A] min-w-8 rounded-xl flex items-center justify-center'>
                <span
                    className='text-lg'
                    style={{ writingMode: 'vertical-rl' }}
                >
                    {type}
                </span>
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <div className='flex-1 w-full'>

                    <h2 className='text-lg font-bold'>
                        {title}
                    </h2>
                    <p className='text-sm'>
                        {description}
                    </p>
                </div>
                <footer className='flex justify-between w-full items-center'>

                    <ul className='flex gap-1'>
                        {
                            stars.map((star, index) => (

                                <li key={index}>
                                    <button className='w-fit aspect-square'
                                        onClick={async () => { await changeStars(bookID, index + 1) }}>
                                        {
                                            star == "filled" ? <IconStarFilled className='text-[#999A66]' />
                                                : <IconStar className='text-[#999A66]' />
                                        }
                                    </button>

                                </li>
                            ))
                        }
                    </ul>
                    <span className='text-[#B3B3B3] text-sm'>
                        {pages} pages
                    </span>
                </footer>
            </div>
        </div>
    )
}

export default BookCard