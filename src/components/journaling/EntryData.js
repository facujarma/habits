'use client'

import { Skeleton } from '@heroui/skeleton';
import { addToast } from '@heroui/toast';
import Header from '@root/sections/Header';
import { getEntryData } from '@root/utils/journal';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function EntryData({ entryID }) {

    const [entryData, setEntryData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getEntryData(entryID).then((data) => {
            if (!data) {
                addToast({
                    title: "Error",
                    description: "There was an error getting the entry.",
                    color: "danger",
                    timeout: 2000
                })
                redirect("/journaling/entries")
            }
            setEntryData(data);
            console.log(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Skeleton className="z-20 w-full h-12 rounded-2xl flex items-center justify-between" />
    }

    const transformDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth();

        const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

        const monthName = months[month];

        const year = date.getFullYear();
        return `${day}th ${monthName} of ${year}`;
    }

    const transformDateWithTime = (isoString) => {
        const date = new Date(isoString);

        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");

        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const period = hours >= 12 ? 'PM' : 'AM';
        const hourFormatted = hours % 12 || 12;

        const monthName = months[month];
        return `${day}th ${monthName} of ${year}, ${hourFormatted}:${minutes} ${period}`;
    }


    return (
        <div className='mb-6'>
            <Header title={`Entry of the ${transformDate(new Date(entryData.created_at))}`} text={`Updated at ${transformDateWithTime(entryData.updated_at)}`} />
        </div >
    )
}

export default EntryData