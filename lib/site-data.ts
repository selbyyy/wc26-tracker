export type TeamProfile = {
  slug: string;
  name: string;
  confederation: string;
  baseWinChance: number;
  roundOf32: number;
  quarterFinal: number;
  semiFinal: number;
  final: number;
  likelyCities: string[];
  pathNote: string;
  userAngle: string;
};

export type HostCity = {
  slug: string;
  name: string;
  country: 'United States' | 'Canada' | 'Mexico';
  venue: string;
  angle: string;
  likelyTeams: string[];
};

export const featuredTeams: TeamProfile[] = [
  {
    slug: 'usa',
    name: 'USA',
    confederation: 'CONCACAF',
    baseWinChance: 4.2,
    roundOf32: 78,
    quarterFinal: 21,
    semiFinal: 9,
    final: 4,
    likelyCities: ['Los Angeles', 'Seattle', 'Dallas'],
    pathNote: 'Host status makes the group path especially important for travel and ticket planning.',
    userAngle: 'Best for fans deciding whether to chase knockout tickets after the group stage.',
  },
  {
    slug: 'mexico',
    name: 'Mexico',
    confederation: 'CONCACAF',
    baseWinChance: 2.5,
    roundOf32: 73,
    quarterFinal: 15,
    semiFinal: 6,
    final: 2,
    likelyCities: ['Mexico City', 'Guadalajara', 'Dallas'],
    pathNote: 'Mexico demand will be strongest around home fixtures and nearby US knockout routes.',
    userAngle: 'Useful for mapping Mexico ticket demand before bracket paths become obvious.',
  },
  {
    slug: 'argentina',
    name: 'Argentina',
    confederation: 'CONMEBOL',
    baseWinChance: 13.5,
    roundOf32: 91,
    quarterFinal: 52,
    semiFinal: 30,
    final: 16,
    likelyCities: ['Miami', 'New York/New Jersey', 'Dallas'],
    pathNote: 'A deep Argentina run can quickly reshape Miami and East Coast ticket demand.',
    userAngle: 'Best for tracking premium travel and knockout-round demand.',
  },
  {
    slug: 'brazil',
    name: 'Brazil',
    confederation: 'CONMEBOL',
    baseWinChance: 12.8,
    roundOf32: 90,
    quarterFinal: 50,
    semiFinal: 28,
    final: 15,
    likelyCities: ['Miami', 'Dallas', 'Atlanta'],
    pathNote: 'Brazil remains one of the highest-sensitivity teams for market and ticket movement.',
    userAngle: 'Good for bettors and fans watching whether the market overreacts to form.',
  },
  {
    slug: 'england',
    name: 'England',
    confederation: 'UEFA',
    baseWinChance: 11.6,
    roundOf32: 89,
    quarterFinal: 48,
    semiFinal: 26,
    final: 14,
    likelyCities: ['New York/New Jersey', 'Philadelphia', 'Boston'],
    pathNote: 'England knockout demand is likely to cluster around the Northeast corridor.',
    userAngle: 'Useful for comparing market price to realistic bracket difficulty.',
  },
  {
    slug: 'france',
    name: 'France',
    confederation: 'UEFA',
    baseWinChance: 12.1,
    roundOf32: 90,
    quarterFinal: 49,
    semiFinal: 27,
    final: 15,
    likelyCities: ['New York/New Jersey', 'Atlanta', 'Dallas'],
    pathNote: 'France is a market bellwether: small news can shift both outright and path pricing.',
    userAngle: 'Strong for tracking market moves after injuries, lineup news, and draw changes.',
  },
  {
    slug: 'spain',
    name: 'Spain',
    confederation: 'UEFA',
    baseWinChance: 12.4,
    roundOf32: 90,
    quarterFinal: 50,
    semiFinal: 28,
    final: 15,
    likelyCities: ['Los Angeles', 'San Francisco Bay Area', 'Vancouver'],
    pathNote: 'Spain often prices as a top-tier contender, so path difficulty matters more than headline odds.',
    userAngle: 'Good for spotting whether markets price style and form too aggressively.',
  },
  {
    slug: 'germany',
    name: 'Germany',
    confederation: 'UEFA',
    baseWinChance: 8.4,
    roundOf32: 86,
    quarterFinal: 39,
    semiFinal: 20,
    final: 10,
    likelyCities: ['Toronto', 'Boston', 'New York/New Jersey'],
    pathNote: 'Germany pages should highlight draw path and whether market reputation exceeds model strength.',
    userAngle: 'Useful for comparing name-brand demand against probability.',
  },
];

export const hostCities: HostCity[] = [
  {
    slug: 'new-york-new-jersey',
    name: 'New York/New Jersey',
    country: 'United States',
    venue: 'MetLife Stadium',
    angle: 'Final-stage demand, global fan concentration, and premium ticket decisions.',
    likelyTeams: ['Argentina', 'England', 'France', 'Germany'],
  },
  {
    slug: 'dallas',
    name: 'Dallas',
    country: 'United States',
    venue: 'AT&T Stadium',
    angle: 'High-volume knockout hub with strong travel and ticket liquidity.',
    likelyTeams: ['USA', 'Mexico', 'Brazil', 'Argentina'],
  },
  {
    slug: 'miami',
    name: 'Miami',
    country: 'United States',
    venue: 'Hard Rock Stadium',
    angle: 'South American demand, premium travel planning, and volatile ticket interest.',
    likelyTeams: ['Argentina', 'Brazil', 'Uruguay', 'Colombia'],
  },
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    country: 'United States',
    venue: 'SoFi Stadium',
    angle: 'West Coast host path, USA interest, and international travel demand.',
    likelyTeams: ['USA', 'Spain', 'Japan', 'Portugal'],
  },
  {
    slug: 'mexico-city',
    name: 'Mexico City',
    country: 'Mexico',
    venue: 'Estadio Azteca',
    angle: 'Home-country group-stage intensity and early tournament demand.',
    likelyTeams: ['Mexico', 'USA', 'Brazil', 'Argentina'],
  },
  {
    slug: 'toronto',
    name: 'Toronto',
    country: 'Canada',
    venue: 'BMO Field',
    angle: 'Canadian host demand and North Atlantic travel routes.',
    likelyTeams: ['Canada', 'Germany', 'England', 'France'],
  },
];

export const scenarioCards = [
  {
    title: 'Group winner path',
    question: 'What changes if a team wins its group instead of finishing second?',
    value: 'Round of 32 opponent, travel city, rest days, and quarterfinal path.',
  },
  {
    title: 'Third-place qualification',
    question: 'How likely is a team to survive as one of the best third-place sides?',
    value: 'The 48-team format makes this a high-search, high-confusion topic.',
  },
  {
    title: 'City exposure',
    question: 'Which teams are most likely to appear in a host city?',
    value: 'This connects football probability to ticket and hotel decisions.',
  },
];

export function getTeamBySlug(slug: string) {
  return featuredTeams.find((team) => team.slug === slug);
}

export function getCityBySlug(slug: string) {
  return hostCities.find((city) => city.slug === slug);
}
