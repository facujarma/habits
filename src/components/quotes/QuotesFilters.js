'use client'

import { Select } from '@heroui/react'
import { SelectItem } from '@heroui/select'
import React, { useState, useEffect } from 'react'
import { useQuotes } from '@root/context/quotesContext'
import ListModeSwitch from './ListModeSwitch'
import { useTranslation } from 'react-i18next'

function QuotesFilters() {
    const { t } = useTranslation('common')
    const { setQuotes, allQuotes, setFilters, listMode, setListMode } = useQuotes()

    const authors = [...new Set(allQuotes.map(quote => quote.author))]
    const feelings = [...new Set(allQuotes.map(quote => quote.feeling))]
    const philosophies = [...new Set(allQuotes.map(quote => quote.philosophy))]

    const [author, setAuthor] = useState(t('quotes_filters_all'))
    const [feeling, setFeeling] = useState(t('quotes_filters_all'))
    const [philosophy, setPhilosophy] = useState(t('quotes_filters_all'))

    useEffect(() => {
        setFilters({ author, feeling, philosophy })
    }, [author, feeling, philosophy, allQuotes, setQuotes])

    const handleAuthorChange = (value) => setAuthor(Array.from(value)[0])
    const handleFeelingChange = (value) => setFeeling(Array.from(value)[0])
    const handlePhilosophyChange = (value) => setPhilosophy(Array.from(value)[0])

    return (
        <div className='z-10 w-full'>
            <ul className='flex flex-wrap gap-4 items-center'>
                <li className='flex flex-col gap-2 w-full '>
                    <span className='text-sm text-start'>{t('quotes_filters_author')}</span>
                    <div className=' w-full flex gap-2'>
                        <Select variant='faded' onSelectionChange={handleAuthorChange} defaultSelectedKeys={[t('quotes_filters_all')]}>
                            <SelectItem value={t('quotes_filters_all')} key={t('quotes_filters_all')}>{t('quotes_filters_all')}</SelectItem>
                            {authors.map((author) => (
                                <SelectItem key={author} aria-label={author} aria-labelledby={author} value={author}>{author}</SelectItem>
                            ))}
                        </Select>
                        <ListModeSwitch listMode={listMode} setListMode={setListMode} />
                    </div>
                </li>
                <li className='flex flex-col gap-2 w-[47%]'>
                    <span className='text-sm'>{t('quotes_filters_feel')}</span>
                    <Select variant='faded' onSelectionChange={handleFeelingChange} defaultSelectedKeys={[t('quotes_filters_all')]}>
                        <SelectItem value={t('quotes_filters_all')} key={t('quotes_filters_all')}>{t('quotes_filters_anyone')}</SelectItem>
                        {feelings.map((feeling) => (
                            <SelectItem key={feeling} aria-label={feeling} aria-labelledby={feeling} value={feeling}>{feeling}</SelectItem>
                        ))}
                    </Select>
                </li>
                <li className='flex flex-col gap-2 w-[47%]'>
                    <span className='text-sm'>{t('quotes_filters_philosophy')}</span>
                    <Select variant='faded' onSelectionChange={handlePhilosophyChange} defaultSelectedKeys={[t('quotes_filters_all')]}>
                        <SelectItem value={t('quotes_filters_all')} key={t('quotes_filters_all')}>{t('quotes_filters_all')}</SelectItem>
                        {philosophies.map((philosophy) => (
                            <SelectItem key={philosophy} aria-label={philosophy} aria-labelledby={philosophy} value={philosophy}>{philosophy}</SelectItem>
                        ))}
                    </Select>
                </li>
            </ul>
        </div>
    )
}

export default QuotesFilters
