// hooks/useI18nReady.ts
'use client'

import { useEffect, useState } from 'react'
import i18n from '@i18n/client'

export default function useI18nReady() {
    const [ready, setReady] = useState(i18n.isInitialized)

    useEffect(() => {
        if (i18n.isInitialized) {
            setReady(true)
        } else {
            const handleReady = () => setReady(true)
            i18n.on('initialized', handleReady)

            return () => {
                i18n.off('initialized', handleReady)
            }
        }
    }, [])

    return ready
}
