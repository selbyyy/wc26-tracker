// app/page.tsx
export const revalidate = 300; 

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
               // 核心修复：自动识别并剥离外层的文本伪装，提取真实的数字
               const parsedPrices = typeof market.outcomePrices === 'string' 
                 ? JSON.parse(market.outcomePrices) 
                 : market.outcomePrices;
               price = parseFloat(parsedPrices[0]);
             } catch (e) {
               return null; // 遇到异常数据直接跳过，保护页面不崩溃
             }

             // 过滤掉无效数字
             if (isNaN(price)) return null;

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