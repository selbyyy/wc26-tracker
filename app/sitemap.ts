// app/sitemap.ts
import { MetadataRoute } from 'next';

// 与首页相同的 URL 转换规则
function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://wc26chances.com';

  // 1. 抓取与网站相同的数据
  const res = await fetch('https://gamma-api.polymarket.com/markets?limit=10&active=true&closed=false', {
    next: { revalidate: 300 }
  });
  const markets = await res.json();

  // 2. 批量生成所有动态网页的爬虫路径
  const marketUrls = markets
    .filter((m: any) => m.outcomePrices)
    .map((market: any) => ({
      url: `${baseUrl}/market/${generateSlug(market.question)}`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8, // 页面权重
    }));

  // 3. 返回完整的地图组合（首页 + 动态页）
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1.0, // 首页权重最高
    },
    ...marketUrls,
  ];
}