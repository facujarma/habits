import { IconArrowBarToRight } from '@tabler/icons-react';
import React from 'react';
import { motion } from 'motion/react';
import { redirect } from 'next/navigation';
function EntryCard({ date, entryID }) {
    const transformDate = (dateString) => {
        const date = new Date(dateString); // 👈 convertir string a Date
        console.log(date);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        const months = [
            "january", "february", "march", "april", "may", "june",
            "july", "august", "september", "october", "november", "december"
        ];

        const monthName = months[month];

        // Opción: transformar 1 → 1st, 2 → 2nd, 3 → 3rd, etc.
        const getOrdinal = (n) => {
            if (n > 3 && n < 21) return `${n}th`;
            switch (n % 10) {
                case 1: return `${n}st`;
                case 2: return `${n}nd`;
                case 3: return `${n}rd`;
                default: return `${n}th`;
            }
        };

        return `${getOrdinal(day)} ${monthName} of ${year}`;
    };

    return (
        <li>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="z-20 w-full h-20 px-3 bg-[#666F9A]/40 border border-[#666F9A] rounded-2xl flex items-center justify-between"
                onClick={() => redirect("/journaling/entries/" + entryID)}
            >

                <h3 className='z-20 text-white text-2xl  font-bold'>{transformDate(date)}</h3>

                <IconArrowBarToRight className='z-20' size={36} color='#666F9A' />

            </motion.button>
        </li>
    );
}

export default EntryCard;
