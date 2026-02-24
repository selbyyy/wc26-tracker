// app/market/[slug]/page.tsx
import { Metadata } from 'next';

export const revalidate = 300;

// 1. 自动生成专属 SEO 标签 (这是诱捕 Google 爬虫的核心所在)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  // 将网址中的横杠还原成文字，例如 france-vs-brazil -> france vs brazil
  const cleanName = resolvedParams.slug.replace(/-/g, ' ');

  return {
    title: `${cleanName} - Real-Time Probability & Odds`,
    description: `Live mathematical prediction and odds for ${cleanName}. Updated every 5 minutes.`,
  };
}

// 2. 网页主体展示
export default async function MarketDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const cleanName = resolvedParams.slug.replace(/-/g, ' ');

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 capitalize">
          {cleanName}
        </h1>
        <div className="p-4 bg-blue-50 text-blue-700 rounded-lg">
          ✅ 模具升级成功！请看你浏览器最上方的标签页标题，已经被自动优化成了长尾关键词。
        </div>
      </div>
    </main>
  );
}