import Link from 'next/link';

export const revalidate = 300; 

function generateSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export default async function Home() {
  const res = await fetch('https://gamma-api.polymarket.com/markets?limit=100&active=true&closed=false&search=FIFA', {
    next: { revalidate: 300 }
  });
  
  const rawMarkets = await res.json();

  // 严格过滤：必须包含足球关键词，且排除政治杂音
  const markets = rawMarkets.filter((m: any) => {
    const text = `${m.question} ${m.description || ''}`.toLowerCase();
    const isWorldCup = text.includes('world cup') || text.includes('fifa');
    const isNotPolitics = !text.includes('trump');
    return isWorldCup && isNotPolitics && m.outcomePrices;
  });

  return (
    <main className="min-h-screen bg-slate-900 text-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center pt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text">
            World Cup 2026 Live Odds
          </h1>
          <p className="text-slate-400 text-lg">Real-time mathematical probabilities from global prediction markets.</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {markets.map((market: any) => {
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
             const slug = generateSlug(market.question);
             
             return (
              <Link href={`/market/${slug}`} key={market.id} className="block group">
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between h-full hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
                  <h2 className="text-xl font-semibold text-slate-100 mb-6 group-hover:text-blue-400 transition-colors">
                    {market.question}
                  </h2>
                  <div className="flex justify-between items-center mt-auto border-t border-slate-700 pt-4">
                    <span className="text-sm text-slate-400 uppercase tracking-wider font-medium">Win Probability</span>
                    <div className="text-3xl font-black text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-lg">
                      {probability}%
                    </div>
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