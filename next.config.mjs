import withPWA from "next-pwa";
import { i18n } from './next-i18next.config.mjs';

/** @type {import('next').NextConfig} */
const baseConfig = {
    reactStrictMode: false,
    i18n, // ✅ Soporte multilenguaje
    experimental: {
        turbo: true,
        serverActions: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    productionBrowserSourceMaps: false,
    devIndicators: {
        buildActivity: false,
        buildActivityPosition: 'bottom-right',
    },
    images: {
        unoptimized: true,
    },
};

const isProd = process.env.NODE_ENV === "production";

export default isProd
    ? withPWA({
        dest: "public",
        register: true,
        skipWaiting: true,
    })(baseConfig)
    : baseConfig;
