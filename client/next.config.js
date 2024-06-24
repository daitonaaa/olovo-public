/** @type {import('next').NextConfig} */
const config = require('config');
const WebAppConfig = config.get('WEB_APP');
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['olovo-prom.com'],
  },
  compiler: {
    styledComponents: true,
  },
  publicRuntimeConfig: {
    WebAppConfig,
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: `${WebAppConfig.API_ADMIN_URL}/page/sitemap`,
      },
      {
        source: '/robots.txt',
        destination: `${WebAppConfig.API_ADMIN_URL}/page/robots`,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    config.resolve.alias['@/currentTemplate'] = path.join(
      __dirname,
      'templates',
      WebAppConfig.template
    );
    config.resolve.alias['@/core'] = path.join(__dirname, 'core');

    return config;
  },
};

module.exports = nextConfig;
