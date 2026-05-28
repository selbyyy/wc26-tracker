import { generateSlug } from './slug';
import {
  type Match,
  getAllTeams,
  getGroupForTeam,
  getNextMatchForLoser,
  getNextMatchForWinner,
  getRoundOf32Route,
} from './schedule';

type GroupForecast = {
  winner: number;
  runnerUp: number;
  thirdAdvance: number;
  out: number;
};

export type PathNode = {
  match: Match;
  arrivalProbability: number;
  winProbability: number;
  loseProbability: number;
  winTotalProbability: number;
  loseTotalProbability: number;
  nextWinMatch?: Match;
  nextLoseMatch?: Match;
};

export type PlacementPath = {
  label: string;
  probability: number;
  entryMatch: Match;
  nodes: PathNode[];
};

const teamPower: Record<string, number> = {
  Argentina: 96,
  Brazil: 95,
  France: 94,
  Spain: 94,
  England: 92,
  Portugal: 89,
  Germany: 87,
  Netherlands: 86,
  Belgium: 84,
  Uruguay: 83,
  Colombia: 82,
  Croatia: 81,
  Mexico: 79,
  USA: 78,
  Morocco: 78,
  Japan: 77,
  Switzerland: 77,
  Senegal: 76,
  Austria: 75,
  Sweden: 75,
  Ecuador: 74,
  Australia: 72,
  Turkiye: 72,
  Canada: 71,
  Ghana: 70,
  Scotland: 70,
  Norway: 70,
  Paraguay: 69,
  'South Korea': 69,
  Iran: 68,
  Egypt: 68,
  'Ivory Coast': 68,
  Algeria: 67,
  Tunisia: 66,
  Czechia: 66,
  'South Africa': 63,
  Qatar: 63,
  'Saudi Arabia': 63,
  Panama: 62,
  Uzbekistan: 62,
  'DR Congo': 61,
  Iraq: 60,
  Jordan: 59,
  'New Zealand': 58,
  Haiti: 57,
  'Bosnia & Herzegovina': 56,
  'Cape Verde': 55,
  Curacao: 52,
};

const groupForecastOverrides: Record<string, GroupForecast> = {
  Argentina: { winner: 58, runnerUp: 28, thirdAdvance: 10, out: 4 },
  Brazil: { winner: 55, runnerUp: 30, thirdAdvance: 10, out: 5 },
  France: { winner: 57, runnerUp: 29, thirdAdvance: 10, out: 4 },
  Spain: { winner: 56, runnerUp: 29, thirdAdvance: 10, out: 5 },
  England: { winner: 56, runnerUp: 29, thirdAdvance: 10, out: 5 },
  Portugal: { winner: 54, runnerUp: 30, thirdAdvance: 11, out: 5 },
  Germany: { winner: 52, runnerUp: 31, thirdAdvance: 11, out: 6 },
  USA: { winner: 42, runnerUp: 33, thirdAdvance: 17, out: 8 },
  Mexico: { winner: 51, runnerUp: 30, thirdAdvance: 13, out: 6 },
  Canada: { winner: 35, runnerUp: 33, thirdAdvance: 21, out: 11 },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function round1(value: number) {
  return Math.round(value * 10) / 10;
}

function getPower(team: string) {
  return teamPower[team] ?? 62;
}

function getStageWinProbability(team: string, stage: Match['stage'], depth: number) {
  const power = getPower(team);
  const base = 50 + (power - 72) * 0.9;
  const stagePenalty =
    stage === 'Round of 32' ? 0 :
    stage === 'Round of 16' ? 4 :
    stage === 'Quarterfinal' ? 8 :
    stage === 'Semifinal' ? 10 :
    stage === 'Final' ? 12 : 0;

  return round1(clamp(base - stagePenalty - depth * 1.5, 38, 78));
}

function modelGroupForecast(team: string): GroupForecast {
  const override = groupForecastOverrides[team];
  if (override) return override;

  const power = getPower(team);
  const winner = clamp(18 + (power - 62) * 1.2, 8, 48);
  const runnerUp = clamp(25 + (power - 62) * 0.35, 16, 34);
  const thirdAdvance = clamp(18 - (power - 62) * 0.12, 8, 24);
  const out = 100 - winner - runnerUp - thirdAdvance;

  return {
    winner: round1(winner),
    runnerUp: round1(runnerUp),
    thirdAdvance: round1(thirdAdvance),
    out: round1(out),
  };
}

function buildNodes(team: string, entryMatch: Match, entryProbability: number) {
  const nodes: PathNode[] = [];
  let currentMatch: Match | undefined = entryMatch;
  let arrivalProbability = entryProbability;
  let depth = 0;

  while (currentMatch) {
    const winProbability = getStageWinProbability(team, currentMatch.stage, depth);
    const loseProbability = round1(100 - winProbability);
    const winTotalProbability = round1(arrivalProbability * winProbability / 100);
    const loseTotalProbability = round1(arrivalProbability * loseProbability / 100);
    const nextWinMatch = getNextMatchForWinner(currentMatch.id);
    const nextLoseMatch = getNextMatchForLoser(currentMatch.id);

    nodes.push({
      match: currentMatch,
      arrivalProbability: round1(arrivalProbability),
      winProbability,
      loseProbability,
      winTotalProbability,
      loseTotalProbability,
      nextWinMatch,
      nextLoseMatch,
    });

    arrivalProbability = winTotalProbability;
    currentMatch = nextWinMatch;
    depth += 1;
  }

  return nodes;
}

export function getTeamProbabilityTree(team: string): PlacementPath[] {
  const group = getGroupForTeam(team);
  const forecast = modelGroupForecast(team);
  const routes = getRoundOf32Route(group);

  return routes.map(({ label, match }) => {
    const probability = label.includes('winner') ? forecast.winner : forecast.runnerUp;
    return {
      label,
      probability,
      entryMatch: match,
      nodes: buildNodes(team, match, probability),
    };
  });
}

export function getTeamGroupForecast(team: string) {
  return modelGroupForecast(team);
}

export function getFeaturedTreeTeams() {
  return ['Argentina', 'Brazil', 'France', 'Spain', 'England', 'Portugal', 'USA', 'Mexico']
    .filter((team) => getAllTeams().some((candidate) => generateSlug(candidate) === generateSlug(team)));
}
