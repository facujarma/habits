'use client'

import { Select } from '@heroui/react'
import { SelectItem } from '@heroui/select'
import React, { useState, useEffect } from 'react'
import { useQuotes } from '@root/context/quotesContext'

function QuotesFilters() {
    const { setQuotes, allQuotes, setFilters } = useQuotes()

    const authors = [...new Set(allQuotes.map(quote => quote.author))]
    const feelings = [...new Set(allQuotes.map(quote => quote.feeling))]
    const philosophies = [...new Set(allQuotes.map(quote => quote.philosophy))]

    const [author, setAuthor] = useState('All')
    const [feeling, setFeeling] = useState('All')
    const [philosophy, setPhilosophy] = useState('All')

    useEffect(() => {
        setFilters({ author, feeling, philosophy })
    }, [author, feeling, philosophy, allQuotes, setQuotes])

    const handleAuthorChange = (value) => setAuthor(Array.from(value)[0])
    const handleFeelingChange = (value) => setFeeling(Array.from(value)[0])
    const handlePhilosophyChange = (value) => setPhilosophy(Array.from(value)[0])

    return (
        <div className='z-10 w-full'>
            <ul className='flex flex-wrap gap-4 items-center'>
                <li className='flex flex-col gap-2 w-full'>
                    <span className='text-sm'> Author </span>
                    <Select variant='faded' onSelectionChange={handleAuthorChange} defaultSelectedKeys={['All']}>
                        <SelectItem value='All' key={'All'} >All</SelectItem>
                        {authors.map((author, index) => (
                            <SelectItem key={author} aria-label={author} aria-labelledby={author} value={author}>{author}</SelectItem>
                        ))}
                    </Select>
                </li>
                <li className='flex flex-col gap-2 w-[47%]'>
                    <span className='text-sm'> Feel </span>
                    <Select variant='faded' onSelectionChange={handleFeelingChange} defaultSelectedKeys={['All']}>
                        <SelectItem value='All' key={'All'}>Anyone</SelectItem>
                        {feelings.map((feeling, index) => (
                            <SelectItem key={feeling} aria-label={feeling} aria-labelledby={feeling} value={feeling}>{feeling}</SelectItem>
                        ))}
                    </Select>
                </li>
                <li className='flex flex-col gap-2 w-[47%]'>
                    <span className='text-sm'> Philosophy </span>
                    <Select variant='faded' onSelectionChange={handlePhilosophyChange} defaultSelectedKeys={['All']}>
                        <SelectItem value='All' key={'All'}>All</SelectItem>
                        {philosophies.map((philosophy, index) => (
                            <SelectItem key={philosophy} aria-label={philosophy} aria-labelledby={philosophy} value={philosophy}>{philosophy}</SelectItem>
                        ))}
                    </Select>
                </li>
            </ul>
        </div>
    )
}

export default QuotesFilters
