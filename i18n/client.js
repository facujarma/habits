'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonEn from 'src/locales/en/common.json';
import commonEs from 'src/locales/es/common.json';
import commonFr from 'src/locales/fr/common.json';
import commonDe from 'src/locales/de/common.json';

if (!i18n.isInitialized) {
    i18n
        .use(LanguageDetector) // 🔍 Detección automática
        .use(initReactI18next)
        .init({
            resources: {
                en: { common: commonEn },
                es: { common: commonEs },
                fr: { common: commonFr },
                de: { common: commonDe },
            },
            fallbackLng: 'en',
            supportedLngs: ['en', 'es', 'fr', 'de'],
            defaultNS: 'common',
            detection: {
                order: ['localStorage', 'navigator'],
                lookupLocalStorage: 'language',
                caches: ['localStorage'],
            },
            react: {
                useSuspense: false,
            },
            initImmediate: false,
        });
}

export default i18n;
