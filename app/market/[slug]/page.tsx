// app/market/[slug]/page.tsx
import { Metadata } from 'next';

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const cleanName = resolvedParams.slug.replace(/-/g, ' ');

  return {
    title: `${cleanName} - Real-Time Probability & Odds`,
    description: `Live mathematical prediction and odds for ${cleanName}. Updated every 5 minutes.`,
  };
}

export default async function MarketDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const cleanName = resolvedParams.slug.replace(/-/g, ' ');

  // 这里未来可以换成你专属的 CPA 返佣链接
  const tradeUrl = `https://polymarket.com`;

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 capitalize">
          {cleanName}
        </h1>
        <p className="text-gray-500 mb-8">
          Data is synced directly from the prediction market.
        </p>
        
        {/* 变现转化按钮 */}
        <a 
          href={tradeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 px-10 rounded-xl transition-colors shadow-md"
        >
          View Odds & Trade
        </a>
      </div>
    </main>
  );
}