import QuotesFilters from '@root/components/QuotesFilters'
import QuotesList from '@root/components/QuotesList'
import { QuotesProvider } from '@root/context/quotesContext';
import Header from '@root/sections/Header'
import React from 'react'

function page() {
    return (
        <div className='flex flex-col relative'>
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="w-[200%] aspect-square absolute top-1/4 left-1/2 -translate-x-1/2 bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_#168680_0%,_rgba(22,_70,_134,_0)_100%)] rounded-full" />
            </div>

            <Header
                title="Quotes"
                text="In this section, you will find inspiring quotes from famous thinkers, leaders, philosophers, captains, and soldiers who inspired thousands of people"
            />
            <QuotesProvider>
                <QuotesFilters />
                <QuotesList />
            </QuotesProvider>
        </div>
    );
}

export default page