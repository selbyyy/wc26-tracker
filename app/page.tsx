import Link from 'next/link';

export const revalidate = 300; 

function generateSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export default async function Home() {
  // 加入 order=volume 强制按资金池降序，核心市场置顶
  const res = await fetch('https://gamma-api.polymarket.com/markets?limit=50&active=true&closed=false&search=World%20Cup&order=volume&ascending=false', {
    next: { revalidate: 300 }
  });
  
  const rawMarkets = await res.json();

  const markets = rawMarkets.filter((m: any) => {
    const text = `${m.question} ${m.description || ''}`.toLowerCase();
    const isWorldCup = text.includes('world cup') || text.includes('fifa');
    const isNotPolitics = !text.includes('trump');
    return isWorldCup && isNotPolitics && m.outcomePrices && m.outcomes;
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
             let prices = [];
             let outcomes = [];
             try {
               prices = typeof market.outcomePrices === 'string' ? JSON.parse(market.outcomePrices) : market.outcomePrices;
               outcomes = typeof market.outcomes === 'string' ? JSON.parse(market.outcomes) : market.outcomes;
             } catch (e) {
               return null; 
             }

             const yesIndex = outcomes.indexOf("Yes");
             const isBinary = yesIndex !== -1 && outcomes.length === 2;

             let displayProb = "0.0";
             let displayLabel = "WIN PROBABILITY";
             let displaySub = "";

             // 智能匹配逻辑：区分二元市场与多选市场
             if (isBinary) {
               const price = parseFloat(prices[yesIndex]);
               if(isNaN(price)) return null;
               displayProb = (price * 100).toFixed(1);
             } else {
               const paired = outcomes.map((name: string, index: number) => ({
                 name,
                 price: parseFloat(prices[index] || "0")
               })).sort((a: any, b: any) => b.price - a.price);
               
               if (paired.length === 0 || isNaN(paired[0].price)) return null;
               displayProb = (paired[0].price * 100).toFixed(1);
               displayLabel = "FAVORITE";
               displaySub = paired[0].name;
             }

             const slug = generateSlug(market.question);
             
             return (
              <Link href={`/market/${slug}`} key={market.id} className="block group">
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between h-full hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
                  <h2 className="text-xl font-semibold text-slate-100 mb-6 group-hover:text-blue-400 transition-colors">
                    {market.question}
                  </h2>
                  <div className="flex justify-between items-end mt-auto border-t border-slate-700 pt-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-400 uppercase tracking-wider font-medium">{displayLabel}</span>
                      {displaySub && <span className="text-lg font-bold text-slate-200 mt-1">{displaySub}</span>}
                    </div>
                    <div className="text-3xl font-black text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-lg">
                      {displayProb}%
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