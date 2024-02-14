/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    cacheOnFrontendNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    disable: false,
    workboxOptions: {
        disableDevLogs: true
    },

});

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pmyveqmxhjhkjxymswkz.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/**',
            },
        ],
    },
}

module.exports = withPWA(nextConfig)
