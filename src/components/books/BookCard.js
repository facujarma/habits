import { useBooks } from '@root/context/booksContext'
import { IconCheck, IconMenu3, IconMenu4, IconStar, IconStarFilled } from '@tabler/icons-react'
import React from 'react'
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    useDisclosure,
} from "@heroui/react";
import RemoveBookModal from './RemoveBookModal';
import { motion } from 'motion/react'
function BookCard({ starsNumber, type, title, description, pages, bookID, finished }) {

    const { onOpen, isOpen, onOpenChange } = useDisclosure();

    const stars = []
    for (let i = 0; i < starsNumber; i++) {
        stars.push("filled")
    }
    for (let i = starsNumber; i < 5; i++) {
        stars.push("empty")
    }

    const { changeStars, changeState } = useBooks()

    const handleOptionSelected = (option) => {
        if (option === "finished" || option === "unfinished") {
            changeState(bookID, !finished)
        }
        if (option === "reflexion") {
            window.location.href = `/books/reflection/${bookID}`
        }
        if (option === "delete") {
            onOpen();
        }
        if (option === "edit") {
            window.location.href = `/books/editBook/${bookID}`
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", bounce: 0.5 },
            }}
            className='relative w-full p-3 min-h-42 bg-[#666F9A]/40 border border-[#666F9A] rounded-2xl flex gap-6'>

            {
                finished && <div className='absolute top-2 right-2 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center'>
                    <IconCheck className='text-white' size={20} />
                </div>
            }

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
                    <span className='text-[#B3B3B3] text-sm'>
                        {pages} pages
                    </span>
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
                    <Dropdown >
                        <DropdownTrigger >
                            <div>
                                <IconMenu4 className="text-[#C5C5C5]" />
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Dropdown Variants" onAction={(key) => handleOptionSelected(key)}>
                            <DropdownItem key="edit">Edit Book</DropdownItem>
                            {
                                finished ? <DropdownItem key="unfinished">Mark as not finished</DropdownItem> :
                                    <DropdownItem key="finished">Mark as finished</DropdownItem>
                            }
                            <DropdownItem key="reflexion">
                                Add a reflection
                            </DropdownItem>
                            <DropdownItem key="delete" className="text-danger" color="danger">
                                Delete Book
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <RemoveBookModal isOpen={isOpen} onOpenChange={onOpenChange} bookID={bookID} />
                </footer>
            </div>
        </motion.div>
    )
}

export default BookCard