// next.config.js
import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
    // ✅ Desactiva ESLint en compilación para evitar retrasos
    eslint: {
        ignoreDuringBuilds: true,
    },

    // ✅ Ignora errores de TypeScript en builds si estás seguro
    typescript: {
        ignoreBuildErrors: true,
    },

    // ✅ Elimina source maps en producción para builds más rápidos
    productionBrowserSourceMaps: false,

    // ✅ Reduce logging para evitar ruido innecesario
    devIndicators: {
        buildActivity: false,
        buildActivityPosition: 'bottom-right',
    },

    // ✅ Acelera imágenes si no usás dominios externos
    images: {
        unoptimized: true,
    },

    // ✅ Activa experimental optimizations (solo si usás `app/`)
    experimental: {
        turbo: true,
        serverActions: true,
    },

    reactStrictMode: false,
};

// ✅ Envolvés la configuración con PWA
export default withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
})(nextConfig);
