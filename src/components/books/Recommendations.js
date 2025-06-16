import { addToast } from '@heroui/toast'
import { useBooks } from '@root/context/booksContext';
import { addBook } from '@root/utils/books'
import React from 'react'

function Recommendations() {
    const recommendedBooks = [
        {
            topic: "Nutrition",
            books: [
                {
                    title: "Food Rules",
                    description: "A practical guide with 64 simple rules for healthy eating.",
                    pages: 112
                },
                {
                    title: "In Defense of Food",
                    description: "Why we should eat real food and avoid nutritionism.",
                    pages: 256
                },
                {
                    title: "The Omnivore’s Dilemma",
                    description: "Explores the ethical and health implications of modern food choices.",
                    pages: 450
                },
                {
                    title: "Cooked",
                    description: "A reflection on cooking as a cultural and transformative act.",
                    pages: 480
                },
                {
                    title: "The Power of Habit",
                    description: "How habits shape our diet and how to change them.",
                    pages: 371
                }
            ]
        },
        {
            topic: "Habits",
            books: [
                {
                    title: "Atomic Habits",
                    description: "Small changes that lead to big transformations.",
                    pages: 320
                },
                {
                    title: "The Power of Habit",
                    description: "Understanding how habits form and how to change them.",
                    pages: 371
                },
                {
                    title: "The 7 Habits of Highly Effective People",
                    description: "Timeless principles for personal and interpersonal effectiveness.",
                    pages: 381
                },
                {
                    title: "Deep Work",
                    description: "Developing focus in a distracted world.",
                    pages: 304
                },
                {
                    title: "The Power of Now",
                    description: "Living in the present moment as a mental habit for peace.",
                    pages: 236
                }
            ]
        },
        {
            topic: "Productivity",
            books: [
                {
                    title: "Getting Things Done",
                    description: "A system to help you organize tasks and get more done with less stress.",
                    pages: 352
                },
                {
                    title: "Deep Work",
                    description: "Master the skill of focused success in a distracted world.",
                    pages: 304
                },
                {
                    title: "Essentialism",
                    description: "Focus on what truly matters by eliminating what doesn't.",
                    pages: 272
                },
                {
                    title: "The 4-Hour Workweek",
                    description: "Escape the 9–5 and live more by working less.",
                    pages: 416
                },
                {
                    title: "Eat That Frog!",
                    description: "21 great ways to stop procrastinating and get things done.",
                    pages: 144
                }
            ]
        },
        {
            topic: "Self-esteem",
            books: [
                {
                    title: "The Gifts of Imperfection",
                    description: "Let go of who you think you should be and embrace who you are.",
                    pages: 160
                },
                {
                    title: "You Are a Badass",
                    description: "Stop doubting your greatness and start living an awesome life.",
                    pages: 256
                },
                {
                    title: "Radical Acceptance",
                    description: "Overcome shame and self-judgment to find self-worth.",
                    pages: 352
                },
                {
                    title: "The Six Pillars of Self-Esteem",
                    description: "A comprehensive guide to building lasting self-respect.",
                    pages: 368
                },
                {
                    title: "What to Say When You Talk to Your Self",
                    description: "Change your internal dialogue to change your life.",
                    pages: 256
                }
            ]
        }
    ]
    const { loadBooks } = useBooks();
    const handleAddToReading = (book) => {
        try {

            addBook(book.title, book.description, book.pages, "Printed Book").then(async () => {
                await loadBooks(true);
                addToast({
                    title: "Book added",
                    description: "The book has been added to your collection successfully.",
                    color: "success",
                    timeout: 2000
                })
            })
        }
        catch (e) {
            addToast({
                title: "Error",
                description: "There was an error adding the book to your collection.",
                color: "danger",
                timeout: 2000
            })
            console.log(e)
        }
    }

    return (
        <div className='mt-6'>
            <header>
                <h2 className='text-2xl text-[#C5C5C5]'>Our Recommendations:</h2>
                <p className="text-[#C5C5C5] text-base leading-6">
                    These are some books we believe could help you get through tough times or become a better person!
                </p>
            </header>

            <div className="mt-4 space-y-6">
                {recommendedBooks.map(({ topic, books }) => (
                    <section key={topic} className='flex gap-6'>

                        <ul className="space-y-2 flex overflow-x-auto gap-5 items-center py-4">
                            <div className='bg-[#242424] border border-[#616161] rounded-2xl p-4 min-w-42 h-24 flex items-center'>
                                <h3 className="text-2xl text-[#C5C5C5] font-semibold mb-2">{topic}</h3>
                            </div>
                            {books.map((book, index) => (
                                <li key={index} className="flex flex-col p-3 border border-[#C5C5C5]/30 rounded-xl bg-[#C5C5C5]/5 min-w-72 h-full">
                                    <div className='flex-1 '>

                                        <h4 className="text-white font-bold text-lg mb-4">{book.title}</h4>
                                        <p className="text-white text-base mb-2">{book.description}</p>
                                        <p className="text-[#B3B3B3] text-base">Pages: {book.pages}</p>
                                    </div>
                                    <button
                                        onClick={() => handleAddToReading(book)}
                                        className=' bg-[#616161] rounded-xl w-full h-10 flex items-center justify-center'>
                                        Add to Reading
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </div>
    )
}

export default Recommendations
