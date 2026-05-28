// app/sitemap.ts
import { MetadataRoute } from 'next';
import { generateSlug, isMarket, isWorldCupMarket } from '@/lib/markets';
import { featuredTeams } from '@/lib/site-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://wc26chances.com';
  const homeUrl = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'always' as const,
    priority: 1.0,
  };

  // 1. 抓取与首页相同的数据，并只保留世界杯相关市场
  let rawMarkets: unknown = [];
  try {
    const res = await fetch('https://gamma-api.polymarket.com/markets?limit=200&active=true&closed=false&search=FIFA', {
      next: { revalidate: 300 }
    });
    rawMarkets = await res.json();
  } catch {
    return [homeUrl];
  }

  const markets = Array.isArray(rawMarkets)
    ? rawMarkets.filter(isMarket).filter(isWorldCupMarket)
    : [];

  const staticUrls = [
    {
      url: `${baseUrl}/cities`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/scenarios`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    },
    ...featuredTeams.map((team) => ({
      url: `${baseUrl}/teams/${team.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.85,
    })),
  ];

  // 2. 批量生成所有动态网页的爬虫路径
  const marketUrls = markets
    .map((market) => ({
      url: `${baseUrl}/market/${generateSlug(market.question)}`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.8, // 页面权重
    }));

  // 3. 返回完整的地图组合（首页 + 动态页）
  return [
    homeUrl,
    ...staticUrls,
    ...marketUrls,
  ];
}
