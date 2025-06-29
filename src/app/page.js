import HomeNavbar from '@root/sections/HomeNavbar'
import React from 'react'

function page() {
    return (
        <div className='max-w-7xl my-12'>
            <HomeNavbar />
            <header className='mt-12 flex '>
                <div className='w-1/2 flex flex-col gap-6'>
                    <h1 className='text-6xl font-bold'>Habits.</h1>
                    <p className='2xl:text-2xl text-xl 2xl:w-full w-3/4'>
                        The ultimate app to track your habits because we focus on much more than only simple habits.
                    </p>
                    <p className='2xl:text-2xl text-xl 2xl:w-full w-3/4'>
                        The app designed to help you improve every aspect of your life. Completely free.
                    </p>
                    <a href='/habits' className='mt-12 2xl:w-1/2 w-1/3 h-14 rounded-2xl font-bold text-xl bg-[#D9D9D9] text-black flex items-center justify-center'>
                        Go to home
                    </a>
                </div>
                <div className='w-1/2 flex justify-center'>
                    <ul className='bg-[#0D0D0D] rounded-2xl p-4 w-fit flex flex-col gap-4'>
                        <li className='w-[25em] bg-[#242424] rounded-2xl p-3'>
                            <h2 className='text-2xl'>
                                Rooms
                            </h2>
                            <p className='2xl:text-lg text-[#A9A9A9]'>
                                Create group habits so your friends can join and track each other’s progress — there are even public rooms available!
                            </p>
                        </li>
                        <li className='w-[25em] bg-[#242424] rounded-2xl p-3'>
                            <h2 className='text-2xl'>
                                Quotes
                            </h2>
                            <p className='2xl:text-lg text-[#A9A9A9]'>
                                Read more than 150 quotes on different topics, writers, philosophies, and much more. Reflect on them and learn how to apply them in your daily life.                            </p>
                        </li>
                        <li className='w-[25em] bg-[#242424] rounded-2xl p-3'>
                            <h2 className='text-2xl'>
                                Juornaling
                            </h2>
                            <p className='2xl:text-lg text-[#A9A9A9]'>
                                Write in your personal journal every day with a simple but powerful editor that lets you beautifully style your reflections.                            </p>
                        </li>
                        <li className='w-[25em] bg-[#242424] rounded-2xl p-3'>
                            <h2 className='text-2xl'>
                                Gym
                            </h2>
                            <p className='2xl:text-lg text-[#A9A9A9]'>
                                Love going to the gym? Create custom exercises and routines — we’ll handle the rest by showing your progress with clear visuals!                            </p>
                        </li>
                    </ul>
                </div>
            </header>
            <main className='w-full my-12 pb-24'>
                <h2 className='my-12 text-center text-4xl font-bold'>
                    We want to help people
                </h2>
                <div className='my-6 rounded-2xl aspect-video grid grid-cols-4 gap-4 grid-rows-3 bg-[#0D0D0D] p-4'>
                    <div className='bg-[#242424] col-span-1 row-span-2 rounded-2xl flex flex-col gap-4 items-center justify-center'>
                        <h2 className='text-5xl'>
                            Simple UI
                        </h2>
                        <p className='text-3xl text-center text-[#C5C5C5]'>
                            For every one to understand
                        </p>
                    </div>
                    <div className='bg-[#242424] col-span-3 row-span-2 rounded-2xl flex items-center justify-center p-6 '>
                        <h2 className='text-5xl'>
                            Over <span className='text-[#82669A]'>6 unique</span>categories to help you grow in<span className='text-[#82669A]'>different areas of your life</span>
                        </h2>
                    </div>
                    <div className='bg-[#242424] col-span-4 row-span-1 rounded-2xl flex items-center justify-center p-6 '>
                        <h2 className='text-4xl text-center'>
                            A journal so flexible and customizable, you could use it as a personal notebook.
                        </h2>
                    </div>
                </div>
                <div className='w-full my-24 flex justify-between'>
                    <div className='w-1/2'>
                        <h2 className='text-6xl font-bold'>
                            A home for the healthier life you're building
                        </h2>
                        <p className='mt-12 text-3xl text-[#C5C5C5]'>
                            Follow every part of your life — wherever you are, whenever you need.
                        </p>
                    </div>
                    <div className='w-1/2 flex justify-center'>
                        <div className='bg-[#0D0D0D] rounded-2xl p-4'>
                            <ul className='flex flex-col gap-4 w-[30em]'>
                                <li className='bg-[#242424] rounded-2xl p-4 text-2xl text-center'>
                                    Use it on your mobile
                                </li>

                                <li className='bg-[#242424] rounded-2xl p-4 text-2xl text-center'>
                                    Use it on your PC
                                </li>

                                <li className='bg-[#242424] rounded-2xl p-4 text-2xl text-center'>
                                    Use it on your fridge
                                </li>
                                <li className='text-2xl text-[#C5C5C5] text-center'>
                                    If you have internet, you can open Habits. No more excuses.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default page