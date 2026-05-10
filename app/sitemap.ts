import { getDataSource } from '@/lib/data/data-factory';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dataSource = getDataSource();
  let paths: { pageType: string; jobType: string }[] = [];

  if (dataSource.getAllPaths) {
    paths = await dataSource.getAllPaths();
  }

  const baseUrl = 'https://yourdomain.com';

  const dynamicUrls = paths.map(({ pageType, jobType }) => ({
    url: `${baseUrl}/${pageType}/${jobType}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...dynamicUrls,
  ];
}