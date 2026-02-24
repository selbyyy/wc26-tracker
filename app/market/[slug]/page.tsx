// app/page.tsx
import Link from 'next/link'; // 引入路由跳转组件

export const revalidate = 300; 

// 核心机制：将人类语言清洗为对 Google 爬虫友好的 URL 格式
function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // 将标点符号和空格替换为横杠
    .replace(/^-+|-+$/g, '');    // 清理首尾多余的横杠
}

export default async function Home() {
  const res = await fetch('https://gamma-api.polymarket.com/markets?limit=10&active=true&closed=false', {
    next: { revalidate: 300 }
  });
  
  const markets = await res.json();

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Live Prediction Tracker</h1>
        <p className="text-gray-500 mb-8">Real-time mathematical probabilities derived from global markets.</p>
        
        <div className="space-y-4">
          {markets
            .filter((m: any) => m.outcomePrices)
            .map((market: any) => {
             let price = 0;
             try {
               const parsedPrices = typeof market.outcomePrices === 'string' 
                 ? JSON.parse(market.outcomePrices) 
                 : market.outcomePrices;
               price = parseFloat(parsedPrices[0]);
             } catch (e) {
               return null; 
             }

             if (isNaN(price)) return null;

             const probability = (price * 100).toFixed(1);
             const slug = generateSlug(market.question); // 自动生成 URL
             
             return (
              // 将整个区块包裹在 Link 中，变成可点击的诱饵
              <Link href={`/market/${slug}`} key={market.id} className="block">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md hover:border-blue-300 transition cursor-pointer">
                  <h2 className="text-lg font-medium text-gray-800 pr-4">{market.question}</h2>
                  <div className="text-2xl font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg whitespace-nowrap">
                    {probability}%
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  );
}