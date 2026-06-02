// app/sitemap.ts
import { MetadataRoute } from 'next';
import { generateSlug } from '@/lib/slug';
import { getAllTeams } from '@/lib/schedule';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.wc26chances.com';
  const homeUrl = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'always' as const,
    priority: 1.0,
  };

  const staticUrls = [
    {
      url: `${baseUrl}/cities`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/world-cup-2026-schedule-by-team`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/world-cup-2026-chances-by-team`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/scenarios`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    },
    ...getAllTeams().map((team) => ({
      url: `${baseUrl}/teams/${generateSlug(team)}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.85,
    })),
  ];

  return [
    homeUrl,
    ...staticUrls,
  ];
}
