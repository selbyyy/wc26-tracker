import { groupStageMatches, type Match } from './schedule';

const tournamentYear = 2026;
const monthIndex: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

export function scheduleDateFromLabel(label: string) {
  const [, month, day] = label.match(/^[A-Za-z]+,\s+([A-Za-z]+)\s+(\d{1,2})$/) || [];
  if (!month || !day || monthIndex[month] === undefined) return null;
  return new Date(Date.UTC(tournamentYear, monthIndex[month], Number(day)));
}

export function scheduleLabelFromDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'America/New_York',
  }).format(date);
}

export function tournamentTodayLabel(now = new Date()) {
  return scheduleLabelFromDate(now);
}

export function getMatchesForScheduleLabel(label: string) {
  return groupStageMatches.filter((match) => match.date === label);
}

export function getUpcomingGroupStageMatches(days = 3, now = new Date()) {
  const today = scheduleDateFromLabel(tournamentTodayLabel(now));
  if (!today) return [];
  const end = new Date(today);
  end.setUTCDate(end.getUTCDate() + days);

  return groupStageMatches.filter((match) => {
    const matchDate = scheduleDateFromLabel(match.date);
    return matchDate && matchDate >= today && matchDate <= end;
  });
}

export function groupMatchesByDate(matches: Match[]) {
  return matches.reduce<Map<string, Match[]>>((groups, match) => {
    const current = groups.get(match.date) || [];
    current.push(match);
    groups.set(match.date, current);
    return groups;
  }, new Map());
}
