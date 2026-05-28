import Link from 'next/link';
import type { Metadata } from 'next';
import { knockoutEntryMatches } from '@/lib/schedule';

export const metadata: Metadata = {
  title: 'World Cup 2026 Knockout Route Map',
  description:
    'See the first knockout route slots for World Cup 2026 groups, including Round of 32 cities and stadiums.',
};

export default function ScenariosPage() {
  const groupWinnerRoutes = knockoutEntryMatches
    .filter((match) => match.home.startsWith('Winner ') || match.away.startsWith('Winner '))
    .slice(0, 12);

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#102033]">
      <section className="bg-[#102033] text-white">
        <div className="mx-auto max-w-7xl px-5 py-6 md:px-8 md:py-10">
          <nav className="mb-8 flex flex-wrap gap-3 text-sm font-black uppercase tracking-wide text-white/70">
            <Link href="/" className="rounded-full bg-white px-4 py-2 text-[#102033]">WC26 Chances</Link>
            <Link href="/teams/argentina" className="px-2 py-2 hover:text-[#ffd447]">Teams</Link>
            <Link href="/cities" className="px-2 py-2 hover:text-[#ffd447]">Cities</Link>
          </nav>
          <p className="inline-flex rounded-full bg-[#ffd447] px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[#102033]">
            Knockout route map
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.98] tracking-normal md:text-7xl">
            If they win the group, where do they go?
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-white/75">
            No confusing forms. The current job is simple: show the first knockout city attached to each group route.
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
    </main>
  );
}
