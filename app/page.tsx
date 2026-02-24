// app/page.tsx
export const revalidate = 300; // 核心机制：每300秒(5分钟)，Vercel 自动在后台请求一次 Polymarket API

export default async function Home() {
  // 调用 Polymarket Gamma API，拉取当前活跃的市场数据 (MVP阶段先拉取10个作为测试)
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
            .filter((m: any) => m.outcomePrices && m.outcomePrices.length > 0)
            .map((market: any) => {
             // 降维转换：提取买盘价格 (如 0.65) 并直接转化为大众秒懂的百分比 (65.0%)
             const price = parseFloat(market.outcomePrices[0]);
             const probability = (price * 100).toFixed(1);
             
             return (
              <div key={market.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition">
                <h2 className="text-lg font-medium text-gray-800 pr-4">{market.question}</h2>
                <div className="text-2xl font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg whitespace-nowrap">
                  {probability}%
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  );
}