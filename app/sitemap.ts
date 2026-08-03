import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { resume, site } from '@/lib/content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    url: new URL(page.url, site.siteUrl).toString(),
    changeFrequency: page.url === '/' ? 'monthly' : 'yearly',
    priority: page.url === '/' ? 1 : 0.7,
  }));
  const projects = resume.portfolio.map((project) => ({
    url: new URL(`/projects/${project.slug}/`, site.siteUrl).toString(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));
  return [...pages, ...projects];
}
