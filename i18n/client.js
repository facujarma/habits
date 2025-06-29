// i18n.ts (o i18n.js)
'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// importa directamente tu JSON
import commonEn from 'src/locales/en/common.json';
import commonEs from 'src/locales/es/common.json';

if (!i18n.isInitialized) {
    i18n
        .use(initReactI18next)
        .init({
            resources: {
                en: { common: commonEn },
                es: { common: commonEs },
            },
            fallbackLng: 'en',
            supportedLngs: ['en', 'es'],
            defaultNS: 'common',
            react: {
                useSuspense: false,
            },
            // evita la inicialización en el siguiente tick
            initImmediate: false,
        });
}

export default i18n;
