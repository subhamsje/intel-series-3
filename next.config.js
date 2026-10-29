/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;

const nextConfig = {
  output: isGithubActions ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
  basePath: isGithubActions ? '/intel-series-3' : '',
  assetPrefix: isGithubActions ? '/intel-series-3/' : '',
  trailingSlash: true,
  devIndicators: false,
};

export default nextConfig;
