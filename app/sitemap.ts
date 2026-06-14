// app/sitemap.ts
import { MetadataRoute } from 'next';
import { generateSlug } from '@/lib/slug';
import {
  getAllCities,
  getAllTeams,
  getCitySlug,
  getGroupStageMatchSlug,
  groupStageMatches,
} from '@/lib/schedule';

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
      url: `${baseUrl}/world-cup-2026-games-today`,
      lastModified: new Date(),
      changeFrequency: 'always' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cities`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/matches`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
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
    ...groupStageMatches.map((match) => ({
      url: `${baseUrl}/matches/${getGroupStageMatchSlug(match)}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.82,
    })),
    ...getAllCities().map((city) => ({
      url: `${baseUrl}/cities/${getCitySlug(city)}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.86,
    })),
  ];

  return [
    homeUrl,
    ...staticUrls,
  ];
}
