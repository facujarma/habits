// next.config.mjs
import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const baseConfig = {
    reactStrictMode: false,
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
