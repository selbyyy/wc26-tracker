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
