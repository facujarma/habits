'use client'

import { getUserJournalHistory } from '@root/utils/journal';
import React, { useEffect, useState } from 'react'
import EntryCard from './EntryCard';
import { Skeleton } from '@heroui/skeleton';

function EntriesList() {

    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        const loadEntries = async () => {
            const entries = await getUserJournalHistory();
            console.log(entries);
            setEntries(entries);
            setLoading(false);
        }
        loadEntries()
    }, [])

    return (
        <ul className='flex flex-col gap-4'>
            {
                !loading ?
                    entries.map((entry) => (
                        <EntryCard key={entry.id} entryID={entry.id} date={entry.created_at} />
                    ))
                    :
                    (
                        <>
                            <Skeleton className="z-20 w-full h-20 rounded-2xl flex items-center justify-between" />
                            <Skeleton className="z-20 w-full h-20 rounded-2xl flex items-center justify-between" />
                            <Skeleton className="z-20 w-full h-20 rounded-2xl flex items-center justify-between" />
                            <Skeleton className="z-20 w-full h-20 rounded-2xl flex items-center justify-between" />
                        </>
                    )
            }
        </ul>
    )
}

export default EntriesList