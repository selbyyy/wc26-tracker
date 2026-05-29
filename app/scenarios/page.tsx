import Link from 'next/link';
import type { Metadata } from 'next';
import { CommercialCta } from '../components/CommercialCta';
import { knockoutEntryMatches } from '@/lib/schedule';

export const metadata: Metadata = {
  title: 'World Cup 2026 Knockout Route by Group: Round of 32 Cities',
  description:
    'See where each World Cup 2026 group winner could play next, including Round of 32 host cities, stadiums, dates, and bracket slots.',
  alternates: {
    canonical: '/scenarios',
  },
  openGraph: {
    title: 'World Cup 2026 Knockout Route by Group: Round of 32 Cities',
    description:
      'Map the first knockout stop for World Cup 2026 group winners by group, city, stadium, and bracket slot.',
    url: '/scenarios',
    type: 'article',
  },
};

export default function ScenariosPage() {
  const groupWinnerRoutes = knockoutEntryMatches
    .filter((match) => match.home.startsWith('Winner ') || match.away.startsWith('Winner '))
    .slice(0, 12);
  const faqItems = [
    {
      question: 'Where does a World Cup 2026 group winner play next?',
      answer:
        'Each group winner has a Round of 32 bracket slot tied to a host city and stadium. This page lists the first knockout stop for group winners.',
    },
    {
      question: 'Does the knockout route depend on group position?',
      answer:
        'Yes. Winning the group, finishing second, or advancing as a third-place team can send a team to different Round of 32 cities.',
    },
    {
      question: 'Can I use this page for travel planning?',
      answer:
        'Use it as an early planning map. The group-stage schedule is confirmed, while knockout opponents depend on tournament results.',
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
      <section className="bg-[#102033] text-white">
        <div className="mx-auto max-w-7xl px-5 py-6 md:px-8 md:py-10">
          <nav className="mb-8 flex flex-wrap gap-3 text-sm font-black uppercase tracking-wide text-white/70">
            <Link href="/" className="rounded-full bg-white px-4 py-2 text-[#102033]">WC26 Chances</Link>
            <Link href="/teams/argentina" className="px-2 py-2 hover:text-[#ffd447]">Teams</Link>
            <Link href="/cities" className="px-2 py-2 hover:text-[#ffd447]">Cities</Link>
          </nav>
          <p className="inline-flex rounded-full bg-[#ffd447] px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[#102033]">
            Knockout paths
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.98] tracking-normal md:text-7xl">
            World Cup 2026 knockout route by group.
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-white/75">
            See the first Round of 32 city for each group winner, using the official bracket slots.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {groupWinnerRoutes.map((match) => {
            const winnerSlot = match.home.startsWith('Winner ') ? match.home : match.away;
            const group = winnerSlot.replace('Winner ', '');

            return (
              <div key={match.id} className="rounded-md border-2 border-[#102033] bg-white p-5 shadow-[6px_6px_0_#ffd447]">
                <p className="text-xs font-black uppercase text-[#e52b2f]">Group {group} winner route</p>
                <h2 className="mt-2 text-3xl font-black">{match.city}</h2>
                <p className="mt-2 font-bold text-[#506070]">{match.stadium}</p>
                <p className="mt-4 rounded-md bg-[#fffaf0] px-3 py-2 text-sm font-black">
                  Match {match.id} · {match.date} · {match.time}
                </p>
                <p className="mt-3 text-sm leading-6 text-[#506070]">
                  Slot: {match.home} vs {match.away}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 md:px-8">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e52b2f]">FAQ</p>
        <h2 className="mt-2 text-4xl font-black">World Cup 2026 route FAQ</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
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
          context="scenarios-tickets"
          title="Planning around a possible run?"
          body="Use the route map to shortlist cities, then check official ticket availability before making travel plans."
          kind="tickets"
        />
        <CommercialCta
          context="scenarios-alerts"
          title="Want a route reminder?"
          body="Tell us the team you care about and we will shape alerts around the cities that become relevant."
          kind="alerts"
        />
      </section>
    </main>
  );
}
