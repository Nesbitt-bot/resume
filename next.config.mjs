import { createMDX } from 'fumadocs-mdx/next';
import { basePath } from './lib/base-path.ts';

const config = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
};

export default createMDX()(config);
