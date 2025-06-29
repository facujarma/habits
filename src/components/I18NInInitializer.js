'use client'

import { useEffect } from 'react'
import i18n from '@i18n/client' // tu instancia

export default function I18nInitializer({ children }) {
    useEffect(() => {
        const savedLang = localStorage.getItem('language')
        if (savedLang && i18n.language !== savedLang) {
            i18n.changeLanguage(savedLang)
        }
    }, [])

    return <>{children}</>
}
