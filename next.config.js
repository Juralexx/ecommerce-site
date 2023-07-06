/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    swcMinify: true,
    experimental: {
        appDir: true
    },
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    },
}

module.exports = nextConfig

module.exports = {
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    },
    webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.node = {
                fs: 'empty'
            }
        }
        return config
    }
}

const ENV = 'development'
const ROOT_DOMAIN = 'alexandrevurbier.com';
const SUB_DOMAIN = 'lejardindesagrumes.alexandrevurbier.com';
const API_DOMAIN = 'api.lejardindesagrumes.alexandrevurbier.com';
const SITE_DOMAIN = 'lejardindesagrumes.alexandrevurbier.com';
const SERVER_URL = ENV !== 'production' ? 'http://localhost:5005' : 'https://api.lejardindesagrumes.alexandrevurbier.com'
const FRONT_URL = ENV !== 'production' ? 'http://localhost:3001' : 'https://lejardindesagrumes.alexandrevurbier.com'

module.exports = {
    serverRuntimeConfig: {
        PROJECT_ROOT: __dirname
    },
    env: {
        ENV: ENV,
        FRONT_URL: FRONT_URL,
        SERVER_URL: SERVER_URL,
        API_KEY: 'UzI1NTa2MjItZWF0IjXNTEM5MDkwIiwibyJzdNGSMeiIskp9.eWIiOiS4gRGI6IkpvaKjM0mFGKVCJoxF2QT4fwKxwRJpMeJhInR5I'
    },
    images: {
        domains: ['localhost', ROOT_DOMAIN, SUB_DOMAIN, API_DOMAIN, SITE_DOMAIN, '*']
    },
}