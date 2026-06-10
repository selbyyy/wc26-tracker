import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CommercialCta } from '@/app/components/CommercialCta';
import { generateSlug } from '@/lib/slug';
import {
  type Match,
  getAllCities,
  getCityBySlug,
  getCityMatches,
  getCitySlug,
  getGroupStageMatchSlug,
} from '@/lib/schedule';

export const dynamic = 'force-static';

function knownTeams(match: Match) {
  return [match.home, match.away].filter((team) => !team.match(/^(Winner|Runner-up|Best|Loser) /));
}

function matchHref(match: Match) {
  return match.stage === 'Group Stage' ? `/matches/${getGroupStageMatchSlug(match)}` : '';
}

export function generateStaticParams() {
  return getAllCities().map((city) => ({ slug: getCitySlug(city) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return { title: 'World Cup 2026 City Not Found' };

  const matches = getCityMatches(city);
  const teams = Array.from(new Set(matches.flatMap(knownTeams)));
  const title = `${city} World Cup 2026 Matches: Teams, Dates, Stadium`;
  const description = `See the ${city} World Cup 2026 schedule: ${matches.length} games, teams including ${teams.slice(0, 4).join(', ')}, dates, stadiums, and planning links.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/cities/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/cities/${slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const matches = getCityMatches(city);
  const country = matches[0]?.country;
  const stadiums = Array.from(new Set(matches.map((match) => match.stadium)));
  const groupMatches = matches.filter((match) => match.stage === 'Group Stage');
  const knockoutMatches = matches.filter((match) => match.stage !== 'Group Stage');
  const teams = Array.from(new Set(matches.flatMap(knownTeams))).sort((a, b) => a.localeCompare(b));
  const faqItems = [
    {
      question: `How many World Cup 2026 games are in ${city}?`,
      answer: `${city} has ${matches.length} scheduled World Cup 2026 games in this dataset, including ${groupMatches.length} group-stage games and ${knockoutMatches.length} later-round slots.`,
    },
    {
      question: `Which teams play in ${city} at World Cup 2026?`,
      answer: teams.length > 0 ? `${teams.slice(0, 12).join(', ')} are among the teams scheduled in ${city}.` : `${city} currently has assigned knockout slots, with teams determined by tournament results.`,
    },
    {
      question: `Which stadium is used in ${city}?`,
      answer: `${city} matches are listed at ${stadiums.join(' and ')}.`,
    },
    {
      question: `Can I use this ${city} page for ticket and hotel planning?`,
      answer:
        'Use it as a planning map: confirm the city, stadium, dates, and possible later-round slots, then check official ticket and hotel sources before booking.',
    },
  ];
  const pageUrl = `https://www.wc26chances.com/cities/${slug}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'WC26 Chances',
          item: 'https://www.wc26chances.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'World Cup 2026 Cities',
          item: 'https://www.wc26chances.com/cities',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: city,
          item: pageUrl,
        },
      ],
    },
    {
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
    },
  ];

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
            <Link href="/matches" className="px-2 py-2 hover:text-[#ffd447]">Matches</Link>
            <Link href="/world-cup-2026-schedule-by-team" className="px-2 py-2 hover:text-[#ffd447]">Schedule</Link>
            <Link href="/cities" className="px-2 py-2 hover:text-[#ffd447]">All cities</Link>
            <Link href="/scenarios" className="px-2 py-2 hover:text-[#ffd447]">Routes</Link>
          </nav>
          <p className="inline-flex rounded-full bg-[#ffd447] px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[#102033]">
            {country} host city
          </p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[0.98] tracking-normal md:text-7xl">
            {city} World Cup 2026 matches.
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-white/85">
            See every scheduled game in {city}: teams, dates, stadiums, group matches, and the later knockout slots that could shape a trip.
          </p>
        </div>
      </section>

      <section className="border-b-4 border-[#102033] bg-[#ffd447]">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-7 md:grid-cols-4 md:px-8">
          {[
            ['Games', `${matches.length}`],
            ['Group games', `${groupMatches.length}`],
            ['Knockout slots', `${knockoutMatches.length}`],
            ['Stadium', stadiums.join(', ')],
          ].map(([label, value]) => (
            <div key={label} className="rounded-md border-2 border-[#102033] bg-white p-4">
              <p className="text-xs font-black uppercase text-[#667085]">{label}</p>
              <p className="mt-1 text-xl font-black">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {teams.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">Teams scheduled here</p>
          <h2 className="mt-2 text-4xl font-black">Start with the teams in {city}</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {teams.map((team) => (
              <Link
                key={team}
                href={`/teams/${generateSlug(team)}`}
                className="rounded-full border-2 border-[#102033] bg-white px-4 py-2 text-sm font-black hover:bg-[#102033] hover:text-white"
              >
                {team}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-5 pb-8 md:px-8">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">Match list</p>
        <h2 className="mt-2 text-4xl font-black">{city} schedule</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {matches.map((match) => {
            const href = matchHref(match);
            const card = (
              <div className="h-full rounded-md border-2 border-[#102033] bg-white p-5 shadow-[6px_6px_0_#ffd447]">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#e52b2f] px-3 py-1 text-xs font-black uppercase text-white">
                    Match {match.id}
                  </span>
                  <span className="text-xs font-black uppercase text-[#667085]">{match.stage}</span>
                </div>
                <h3 className="mt-4 text-2xl font-black">{match.home} vs {match.away}</h3>
                <p className="mt-2 text-sm font-bold text-[#506070]">{match.stadium}</p>
                <p className="mt-3 rounded-md bg-[#fffaf0] px-3 py-2 text-sm font-black">
                  {match.date} · {match.time}
                </p>
                {match.group && (
                  <p className="mt-3 text-sm font-black text-[#0b7a3b]">Group {match.group}</p>
                )}
              </div>
            );

            return href ? (
              <Link key={match.id} href={href} className="block hover:bg-[#fffaf0]">
                {card}
              </Link>
            ) : (
              <div key={match.id}>{card}</div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-8 md:grid-cols-2 md:px-8">
        <CommercialCta
          context={`city-${slug}-hotels`}
          title={`Looking at hotels in ${city}?`}
          body="Use the match list to decide which dates matter, then compare hotel options before demand moves."
          kind="hotels"
        />
        <CommercialCta
          context={`city-${slug}-alerts`}
          title={`Want ${city} route updates?`}
          body="Send the city or team you care about and we will shape a simple route alert around it."
          kind="alerts"
        />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 md:px-8">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">FAQ</p>
        <h2 className="mt-2 text-4xl font-black">{city} World Cup 2026 FAQ</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {faqItems.map((item) => (
            <div key={item.question} className="rounded-md border-2 border-[#102033] bg-white p-5">
              <h3 className="text-xl font-black">{item.question}</h3>
              <p className="mt-2 leading-7 text-[#506070]">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
