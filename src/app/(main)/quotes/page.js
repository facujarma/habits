'use client'

import FavoriteQuotes from '@quotes/FavoriteQuotes';
import QuotesFilters from '@quotes/QuotesFilters';
import QuotesList from '@quotes/QuotesList';
import { QuotesProvider } from '@root/context/quotesContext';
import Header from '@sections/Header';
import React from 'react';
import { useTranslation } from 'react-i18next';

function Page() {
    const { t } = useTranslation('common');

    return (
        <div className='flex flex-col relative'>
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="w-[200%] aspect-square absolute top-1/4 left-1/2 -translate-x-1/2 bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_#168680_0%,_rgba(22,_70,_134,_0)_100%)] rounded-full" />
            </div>

            <Header
                title={t('quotes_title')}
                text={t('quotes_description')}
            />
            <QuotesProvider>
                <QuotesFilters />
                <QuotesList />
                <h2 className='text-xl text-[#C5C5C5] my-4 z-10'>{t('quotes_saved_header')}</h2>
                <FavoriteQuotes />
            </QuotesProvider>

        </div>
    );
}

export default Page;
