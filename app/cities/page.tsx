import Link from 'next/link';
import type { Metadata } from 'next';
import { CommercialCta } from '../components/CommercialCta';
import { generateSlug } from '@/lib/slug';
import { allMatches } from '@/lib/schedule';

export const metadata: Metadata = {
  title: 'World Cup 2026 Cities by Team: Matches, Stadiums, Routes',
  description:
    'See which World Cup 2026 teams play in each host city, including scheduled matches, stadiums, dates, and possible knockout games.',
  alternates: {
    canonical: '/cities',
  },
  openGraph: {
    title: 'World Cup 2026 Cities by Team: Matches, Stadiums, Routes',
    description:
      'Find World Cup 2026 host cities, stadiums, scheduled teams, match dates, and possible knockout games.',
    url: '/cities',
    type: 'article',
  },
};

const cityOrder = [
  'Mexico City',
  'Guadalajara',
  'Monterrey',
  'Toronto',
  'Vancouver',
  'Los Angeles',
  'Seattle',
  'San Francisco Bay Area',
  'Dallas',
  'Houston',
  'Kansas City',
  'Atlanta',
  'Miami',
  'Boston',
  'Philadelphia',
  'New York/New Jersey',
];

export default function CitiesPage() {
  const cities = cityOrder.map((city) => ({
    city,
    matches: allMatches.filter((match) => match.city === city),
  }));
  const faqItems = [
    {
      question: 'Which cities are hosting World Cup 2026 matches?',
      answer:
        'World Cup 2026 matches are scheduled across host cities in the United States, Canada, and Mexico, including Dallas, Los Angeles, Mexico City, Toronto, Vancouver, Miami, and New York/New Jersey.',
    },
    {
      question: 'Can I see World Cup 2026 cities by team?',
      answer:
        'Yes. Each city card lists scheduled matches and links to the team pages for the teams currently assigned to that city.',
    },
    {
      question: 'Which World Cup 2026 city has the final?',
      answer: 'The World Cup 2026 final is scheduled for MetLife Stadium in New York/New Jersey.',
    },
    {
      question: 'Do city pages include knockout games?',
      answer:
        'Yes. The city guide includes group-stage matches and later knockout matches where the bracket already assigns a stadium and city.',
    },
  ];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#102033]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-[#e52b2f] text-white">
        <div className="mx-auto max-w-7xl px-5 py-6 md:px-8 md:py-10">
          <nav className="mb-8 flex flex-wrap gap-3 text-sm font-black uppercase tracking-wide text-white/75">
            <Link href="/" className="rounded-full bg-white px-4 py-2 text-[#e52b2f]">WC26 Chances</Link>
            <Link href="/teams/argentina" className="px-2 py-2 hover:text-[#ffd447]">Teams</Link>
            <Link href="/scenarios" className="px-2 py-2 hover:text-[#ffd447]">Routes</Link>
          </nav>
          <p className="inline-flex rounded-full bg-[#ffd447] px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[#102033]">
            Host city guide
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.98] tracking-normal md:text-7xl">
            World Cup 2026 cities by team.
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-white/85">
            Pick a host city and see which teams play there, which stadiums are used, and which later-round games
            could shape a trip.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cities.map(({ city, matches }) => {
            const teams = Array.from(
              new Set(matches.flatMap((match) => [match.home, match.away]).filter((team) => !team.match(/^(Winner|Runner-up|Best|Loser) /))),
            ).sort((a, b) => a.localeCompare(b));

            return (
              <div key={city} className="rounded-md border-2 border-[#102033] bg-white p-5 shadow-[6px_6px_0_#ffd447]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase text-[#667085]">{matches[0]?.country}</p>
                    <h2 className="mt-1 text-2xl font-black">{city}</h2>
                  </div>
                  <span className="rounded-full bg-[#0b7a3b] px-3 py-1 text-xs font-black text-white">
                    {matches.length} games
                  </span>
                </div>

                {teams.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-black uppercase text-[#e52b2f]">Teams scheduled here</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {teams.slice(0, 8).map((team) => (
                        <Link
                          key={team}
                          href={`/teams/${generateSlug(team)}`}
                          className="rounded-full border-2 border-[#102033] bg-[#fffaf0] px-3 py-1 text-xs font-black hover:bg-[#102033] hover:text-white"
                        >
                          {team}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-5 space-y-3">
                  {matches.slice(0, 5).map((match) => (
                    <div key={match.id} className="rounded-md bg-[#fffaf0] p-3">
                      <p className="text-sm font-black">
                        Match {match.id}: {match.home} vs {match.away}
                      </p>
                      <p className="mt-1 text-xs font-bold text-[#506070]">
                        {match.stage} · {match.date} · {match.stadium}
                      </p>
                    </div>
                  ))}
                </div>

                {matches.length > 5 && (
                  <p className="mt-4 text-sm font-black text-[#e52b2f]">
                    + {matches.length - 5} more group or knockout games
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 md:px-8">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">FAQ</p>
        <h2 className="mt-2 text-4xl font-black">World Cup 2026 host city FAQ</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {faqItems.map((item) => (
            <div key={item.question} className="rounded-md border-2 border-[#102033] bg-white p-5">
              <h3 className="text-xl font-black">{item.question}</h3>
              <p className="mt-2 leading-7 text-[#506070]">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-8 md:grid-cols-2 md:px-8">
        <CommercialCta
          context="cities-hotels"
          title="Thinking about hotels?"
          body="Use the match list to decide which city is worth watching, then compare hotel options before the rush."
          kind="hotels"
        />
        <CommercialCta
          context="cities-alerts"
          title="Following one city?"
          body="Tell us which host city you care about and we will shape alerts around the teams that may end up there."
          kind="alerts"
        />
      </section>
    </main>
  );
}
