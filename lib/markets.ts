export type Market = {
  id: string;
  question: string;
  description?: string;
  outcomePrices?: string | string[];
  outcomes?: string | string[];
  volume?: number;
};

export type OutcomePrice = {
  name: string;
  price: number;
};

const POLYMARKET_WORLD_CUP_URL =
  'https://gamma-api.polymarket.com/markets?limit=200&active=true&closed=false&search=FIFA';

export function generateSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function isMarket(value: unknown): value is Market {
  return typeof value === 'object' && value !== null && 'question' in value;
}

export function parseStringArray(value: string | string[] | undefined) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export function isWorldCupMarket(market: Market) {
  const text = `${market.question} ${market.description || ''}`.toLowerCase();
  const isWorldCup = text.includes('world cup') || text.includes('fifa');
  const isNotPolitics = !text.includes('trump');
  return isWorldCup && isNotPolitics && market.outcomePrices && market.outcomes;
}

export async function getWorldCupMarkets() {
  try {
    const res = await fetch(POLYMARKET_WORLD_CUP_URL, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(3500),
    });
    const rawMarkets: unknown = await res.json();
    if (!Array.isArray(rawMarkets)) return [];
    return rawMarkets.filter(isMarket).filter(isWorldCupMarket);
  } catch {
    return [];
  }
}

export function getBinaryYesProbability(market: Market) {
  const prices = parseStringArray(market.outcomePrices);
  const outcomes = parseStringArray(market.outcomes);
  const yesIndex = outcomes.indexOf('Yes');

  if (yesIndex === -1 || outcomes.length !== 2) return null;

  const price = parseFloat(prices[yesIndex] || '0');
  return Number.isFinite(price) ? price * 100 : null;
}

export function findTeamWinMarket(markets: Market[], teamName: string) {
  const normalizedTeam = teamName.toLowerCase();
  return markets.find((market) => {
    const question = market.question.toLowerCase();
    return (
      question.includes(normalizedTeam) &&
      question.includes('win') &&
      question.includes('2026') &&
      (question.includes('world cup') || question.includes('fifa'))
    );
  });
}

export function formatPercent(value: number) {
  return `${value.toFixed(value >= 10 ? 0 : 1)}%`;
}
