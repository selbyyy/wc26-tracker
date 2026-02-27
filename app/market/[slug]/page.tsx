import { Metadata } from 'next';

export const revalidate = 300;

function generateSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const cleanName = resolvedParams.slug.replace(/-/g, ' ');
  return {
    title: `${cleanName} - Live Odds & Volume | World Cup 2026`,
    description: `Live mathematical prediction, odds, and trading volume for ${cleanName}. Zero vig market consensus.`,
  };
}

export default async function MarketDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // 必须与首页保持完全一致的数据源
  const res = await fetch('https://gamma-api.polymarket.com/markets?limit=200&active=true&closed=false&search=FIFA', {
    next: { revalidate: 300 }
  });
  const markets = await res.json();
  
  const market = markets.find((m: any) => generateSlug(m.question) === resolvedParams.slug);

  let probability = "N/A";
  let volume = "$0";
  let displaySub = "";
  let displayLabel = "WIN PROBABILITY";

  if (market) {
    try {
      const prices = typeof market.outcomePrices === 'string' ? JSON.parse(market.outcomePrices) : market.outcomePrices;
      const outcomes = typeof market.outcomes === 'string' ? JSON.parse(market.outcomes) : market.outcomes;
      
      const yesIndex = outcomes.indexOf("Yes");
      const isBinary = yesIndex !== -1 && outcomes.length === 2;
      
      if (isBinary) {
        probability = (parseFloat(prices[yesIndex]) * 100).toFixed(1) + "%";
      } else {
        const paired = outcomes.map((name: string, index: number) => ({
          name,
          price: parseFloat(prices[index] || "0")
        })).sort((a: any, b: any) => b.price - a.price);
        
        probability = (paired[0].price * 100).toFixed(1) + "%";
        displaySub = paired[0].name;
        displayLabel = "FAVORITE";
      }
    } catch(e) {}
    volume = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(market.volume || 0);
  }

  const cleanName = market ? market.question : resolvedParams.slug.replace(/-/g, ' ');
  const tradeUrl = `https://polymarket.com`; 

  return (
    <main className="min-h-screen bg-slate-900 text-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-3xl mx-auto bg-slate-800 p-8 md:p-12 rounded-2xl border border-slate-700 shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-8 leading-tight">
          {cleanName}
        </h1>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">
            <p className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">{displayLabel}</p>
            {displaySub && <p className="text-xl font-bold text-slate-200 mb-1">{displaySub}</p>}
            <p className="text-4xl font-black text-emerald-400">{probability}</p>
          </div>
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">
            <p className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">Trading Volume</p>
            <p className="text-4xl font-black text-blue-400">{volume}</p>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-xl mb-10">
          <h3 className="text-blue-400 font-semibold mb-4 text-lg">🔥 Why Trade Here?</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex justify-between items-center">
              <span>Traditional Sportsbooks (e.g. DraftKings)</span>
              <span className="text-red-400 font-medium bg-red-400/10 px-3 py-1 rounded">~10% Vig (Fee)</span>
            </li>
            <li className="flex justify-between items-center border-t border-slate-700 pt-3 mt-1">
              <span className="font-medium text-slate-100">Prediction Market</span>
              <span className="text-emerald-400 font-bold bg-emerald-400/10 px-3 py-1 rounded">0% Vig (Pure Odds)</span>
            </li>
          </ul>
        </div>

        <a 
          href={tradeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-bold text-xl py-5 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
        >
          Trade Now with USDC
        </a>
      </div>
    </main>
  );
}