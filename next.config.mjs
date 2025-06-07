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
        turbo: true, // importante para habilitar Turbopack
        serverActions: true,
    },
    reactStrictMode: false,
};

export default nextConfig;
