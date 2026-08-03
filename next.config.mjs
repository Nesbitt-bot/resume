import { createMDX } from 'fumadocs-mdx/next';

const config = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default createMDX()(config);
