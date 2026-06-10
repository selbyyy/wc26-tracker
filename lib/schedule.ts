import { generateSlug } from './slug';

export type Match = {
  id: number;
  date: string;
  time: string;
  stage: 'Group Stage' | 'Round of 32' | 'Round of 16' | 'Quarterfinal' | 'Semifinal' | 'Third Place' | 'Final';
  group?: string;
  home: string;
  away: string;
  stadium: string;
  city: string;
  country: 'United States' | 'Canada' | 'Mexico';
};

export const groupStageMatches: Match[] = [
  { id: 1, date: 'Thu, Jun 11', time: '3:00 PM', stage: 'Group Stage', group: 'A', home: 'Mexico', away: 'South Africa', stadium: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico' },
  { id: 2, date: 'Thu, Jun 11', time: '10:00 PM', stage: 'Group Stage', group: 'A', home: 'South Korea', away: 'Czechia', stadium: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico' },
  { id: 3, date: 'Fri, Jun 12', time: '3:00 PM', stage: 'Group Stage', group: 'B', home: 'Canada', away: 'Bosnia & Herzegovina', stadium: 'BMO Field', city: 'Toronto', country: 'Canada' },
  { id: 4, date: 'Fri, Jun 12', time: '9:00 PM', stage: 'Group Stage', group: 'D', home: 'USA', away: 'Paraguay', stadium: 'SoFi Stadium', city: 'Los Angeles', country: 'United States' },
  { id: 5, date: 'Sat, Jun 13', time: '3:00 PM', stage: 'Group Stage', group: 'B', home: 'Qatar', away: 'Switzerland', stadium: "Levi's Stadium", city: 'San Francisco Bay Area', country: 'United States' },
  { id: 6, date: 'Sat, Jun 13', time: '6:00 PM', stage: 'Group Stage', group: 'C', home: 'Brazil', away: 'Morocco', stadium: 'MetLife Stadium', city: 'New York/New Jersey', country: 'United States' },
  { id: 7, date: 'Sat, Jun 13', time: '9:00 PM', stage: 'Group Stage', group: 'C', home: 'Haiti', away: 'Scotland', stadium: 'Gillette Stadium', city: 'Boston', country: 'United States' },
  { id: 8, date: 'Sun, Jun 14', time: '12:00 AM', stage: 'Group Stage', group: 'D', home: 'Australia', away: 'Turkiye', stadium: 'BC Place', city: 'Vancouver', country: 'Canada' },
  { id: 9, date: 'Sun, Jun 14', time: '1:00 PM', stage: 'Group Stage', group: 'E', home: 'Germany', away: 'Curacao', stadium: 'NRG Stadium', city: 'Houston', country: 'United States' },
  { id: 10, date: 'Sun, Jun 14', time: '4:00 PM', stage: 'Group Stage', group: 'F', home: 'Netherlands', away: 'Japan', stadium: 'AT&T Stadium', city: 'Dallas', country: 'United States' },
  { id: 11, date: 'Sun, Jun 14', time: '7:00 PM', stage: 'Group Stage', group: 'E', home: 'Ivory Coast', away: 'Ecuador', stadium: 'Lincoln Financial Field', city: 'Philadelphia', country: 'United States' },
  { id: 12, date: 'Sun, Jun 14', time: '10:00 PM', stage: 'Group Stage', group: 'F', home: 'Sweden', away: 'Tunisia', stadium: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico' },
  { id: 13, date: 'Mon, Jun 15', time: '12:00 PM', stage: 'Group Stage', group: 'H', home: 'Spain', away: 'Cape Verde', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'United States' },
  { id: 14, date: 'Mon, Jun 15', time: '3:00 PM', stage: 'Group Stage', group: 'G', home: 'Belgium', away: 'Egypt', stadium: 'Lumen Field', city: 'Seattle', country: 'United States' },
  { id: 15, date: 'Mon, Jun 15', time: '6:00 PM', stage: 'Group Stage', group: 'H', home: 'Saudi Arabia', away: 'Uruguay', stadium: 'Hard Rock Stadium', city: 'Miami', country: 'United States' },
  { id: 16, date: 'Mon, Jun 15', time: '9:00 PM', stage: 'Group Stage', group: 'G', home: 'Iran', away: 'New Zealand', stadium: 'SoFi Stadium', city: 'Los Angeles', country: 'United States' },
  { id: 17, date: 'Tue, Jun 16', time: '3:00 PM', stage: 'Group Stage', group: 'I', home: 'France', away: 'Senegal', stadium: 'MetLife Stadium', city: 'New York/New Jersey', country: 'United States' },
  { id: 18, date: 'Tue, Jun 16', time: '6:00 PM', stage: 'Group Stage', group: 'I', home: 'Iraq', away: 'Norway', stadium: 'Gillette Stadium', city: 'Boston', country: 'United States' },
  { id: 19, date: 'Tue, Jun 16', time: '9:00 PM', stage: 'Group Stage', group: 'J', home: 'Argentina', away: 'Algeria', stadium: 'Arrowhead Stadium', city: 'Kansas City', country: 'United States' },
  { id: 20, date: 'Wed, Jun 17', time: '12:00 AM', stage: 'Group Stage', group: 'J', home: 'Austria', away: 'Jordan', stadium: "Levi's Stadium", city: 'San Francisco Bay Area', country: 'United States' },
  { id: 21, date: 'Wed, Jun 17', time: '1:00 PM', stage: 'Group Stage', group: 'K', home: 'Portugal', away: 'DR Congo', stadium: 'NRG Stadium', city: 'Houston', country: 'United States' },
  { id: 22, date: 'Wed, Jun 17', time: '4:00 PM', stage: 'Group Stage', group: 'L', home: 'England', away: 'Croatia', stadium: 'AT&T Stadium', city: 'Dallas', country: 'United States' },
  { id: 23, date: 'Wed, Jun 17', time: '7:00 PM', stage: 'Group Stage', group: 'L', home: 'Ghana', away: 'Panama', stadium: 'BMO Field', city: 'Toronto', country: 'Canada' },
  { id: 24, date: 'Wed, Jun 17', time: '10:00 PM', stage: 'Group Stage', group: 'K', home: 'Uzbekistan', away: 'Colombia', stadium: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico' },
  { id: 25, date: 'Thu, Jun 18', time: '12:00 PM', stage: 'Group Stage', group: 'A', home: 'Czechia', away: 'South Africa', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'United States' },
  { id: 26, date: 'Thu, Jun 18', time: '3:00 PM', stage: 'Group Stage', group: 'B', home: 'Switzerland', away: 'Bosnia & Herzegovina', stadium: 'SoFi Stadium', city: 'Los Angeles', country: 'United States' },
  { id: 27, date: 'Thu, Jun 18', time: '6:00 PM', stage: 'Group Stage', group: 'B', home: 'Canada', away: 'Qatar', stadium: 'BC Place', city: 'Vancouver', country: 'Canada' },
  { id: 28, date: 'Thu, Jun 18', time: '9:00 PM', stage: 'Group Stage', group: 'A', home: 'Mexico', away: 'South Korea', stadium: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico' },
  { id: 29, date: 'Fri, Jun 19', time: '3:00 PM', stage: 'Group Stage', group: 'D', home: 'USA', away: 'Australia', stadium: 'Lumen Field', city: 'Seattle', country: 'United States' },
  { id: 30, date: 'Fri, Jun 19', time: '6:00 PM', stage: 'Group Stage', group: 'C', home: 'Scotland', away: 'Morocco', stadium: 'Gillette Stadium', city: 'Boston', country: 'United States' },
  { id: 31, date: 'Fri, Jun 19', time: '8:30 PM', stage: 'Group Stage', group: 'C', home: 'Brazil', away: 'Haiti', stadium: 'Lincoln Financial Field', city: 'Philadelphia', country: 'United States' },
  { id: 32, date: 'Fri, Jun 19', time: '11:00 PM', stage: 'Group Stage', group: 'D', home: 'Turkiye', away: 'Paraguay', stadium: "Levi's Stadium", city: 'San Francisco Bay Area', country: 'United States' },
  { id: 33, date: 'Sat, Jun 20', time: '1:00 PM', stage: 'Group Stage', group: 'F', home: 'Netherlands', away: 'Sweden', stadium: 'NRG Stadium', city: 'Houston', country: 'United States' },
  { id: 34, date: 'Sat, Jun 20', time: '4:00 PM', stage: 'Group Stage', group: 'E', home: 'Germany', away: 'Ivory Coast', stadium: 'BMO Field', city: 'Toronto', country: 'Canada' },
  { id: 35, date: 'Sat, Jun 20', time: '8:00 PM', stage: 'Group Stage', group: 'E', home: 'Ecuador', away: 'Curacao', stadium: 'Arrowhead Stadium', city: 'Kansas City', country: 'United States' },
  { id: 36, date: 'Sun, Jun 21', time: '12:00 AM', stage: 'Group Stage', group: 'F', home: 'Tunisia', away: 'Japan', stadium: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico' },
  { id: 37, date: 'Sun, Jun 21', time: '12:00 PM', stage: 'Group Stage', group: 'H', home: 'Spain', away: 'Saudi Arabia', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'United States' },
  { id: 38, date: 'Sun, Jun 21', time: '3:00 PM', stage: 'Group Stage', group: 'G', home: 'Belgium', away: 'Iran', stadium: 'SoFi Stadium', city: 'Los Angeles', country: 'United States' },
  { id: 39, date: 'Sun, Jun 21', time: '6:00 PM', stage: 'Group Stage', group: 'H', home: 'Uruguay', away: 'Cape Verde', stadium: 'Hard Rock Stadium', city: 'Miami', country: 'United States' },
  { id: 40, date: 'Sun, Jun 21', time: '9:00 PM', stage: 'Group Stage', group: 'G', home: 'New Zealand', away: 'Egypt', stadium: 'BC Place', city: 'Vancouver', country: 'Canada' },
  { id: 41, date: 'Mon, Jun 22', time: '1:00 PM', stage: 'Group Stage', group: 'J', home: 'Argentina', away: 'Austria', stadium: 'AT&T Stadium', city: 'Dallas', country: 'United States' },
  { id: 42, date: 'Mon, Jun 22', time: '5:00 PM', stage: 'Group Stage', group: 'I', home: 'France', away: 'Iraq', stadium: 'Lincoln Financial Field', city: 'Philadelphia', country: 'United States' },
  { id: 43, date: 'Mon, Jun 22', time: '8:00 PM', stage: 'Group Stage', group: 'I', home: 'Norway', away: 'Senegal', stadium: 'MetLife Stadium', city: 'New York/New Jersey', country: 'United States' },
  { id: 44, date: 'Mon, Jun 22', time: '11:00 PM', stage: 'Group Stage', group: 'J', home: 'Jordan', away: 'Algeria', stadium: "Levi's Stadium", city: 'San Francisco Bay Area', country: 'United States' },
  { id: 45, date: 'Tue, Jun 23', time: '1:00 PM', stage: 'Group Stage', group: 'K', home: 'Portugal', away: 'Uzbekistan', stadium: 'NRG Stadium', city: 'Houston', country: 'United States' },
  { id: 46, date: 'Tue, Jun 23', time: '4:00 PM', stage: 'Group Stage', group: 'L', home: 'England', away: 'Ghana', stadium: 'Gillette Stadium', city: 'Boston', country: 'United States' },
  { id: 47, date: 'Tue, Jun 23', time: '7:00 PM', stage: 'Group Stage', group: 'L', home: 'Panama', away: 'Croatia', stadium: 'BMO Field', city: 'Toronto', country: 'Canada' },
  { id: 48, date: 'Tue, Jun 23', time: '10:00 PM', stage: 'Group Stage', group: 'K', home: 'Colombia', away: 'DR Congo', stadium: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico' },
  { id: 49, date: 'Wed, Jun 24', time: '3:00 PM', stage: 'Group Stage', group: 'B', home: 'Switzerland', away: 'Canada', stadium: 'BC Place', city: 'Vancouver', country: 'Canada' },
  { id: 50, date: 'Wed, Jun 24', time: '3:00 PM', stage: 'Group Stage', group: 'B', home: 'Bosnia & Herzegovina', away: 'Qatar', stadium: 'Lumen Field', city: 'Seattle', country: 'United States' },
  { id: 51, date: 'Wed, Jun 24', time: '6:00 PM', stage: 'Group Stage', group: 'C', home: 'Scotland', away: 'Brazil', stadium: 'Hard Rock Stadium', city: 'Miami', country: 'United States' },
  { id: 52, date: 'Wed, Jun 24', time: '6:00 PM', stage: 'Group Stage', group: 'C', home: 'Morocco', away: 'Haiti', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'United States' },
  { id: 53, date: 'Wed, Jun 24', time: '9:00 PM', stage: 'Group Stage', group: 'A', home: 'Czechia', away: 'Mexico', stadium: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico' },
  { id: 54, date: 'Wed, Jun 24', time: '9:00 PM', stage: 'Group Stage', group: 'A', home: 'South Africa', away: 'South Korea', stadium: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico' },
  { id: 55, date: 'Thu, Jun 25', time: '4:00 PM', stage: 'Group Stage', group: 'E', home: 'Curacao', away: 'Ivory Coast', stadium: 'Lincoln Financial Field', city: 'Philadelphia', country: 'United States' },
  { id: 56, date: 'Thu, Jun 25', time: '4:00 PM', stage: 'Group Stage', group: 'E', home: 'Ecuador', away: 'Germany', stadium: 'MetLife Stadium', city: 'New York/New Jersey', country: 'United States' },
  { id: 57, date: 'Thu, Jun 25', time: '7:00 PM', stage: 'Group Stage', group: 'F', home: 'Japan', away: 'Sweden', stadium: 'AT&T Stadium', city: 'Dallas', country: 'United States' },
  { id: 58, date: 'Thu, Jun 25', time: '7:00 PM', stage: 'Group Stage', group: 'F', home: 'Tunisia', away: 'Netherlands', stadium: 'Arrowhead Stadium', city: 'Kansas City', country: 'United States' },
  { id: 59, date: 'Thu, Jun 25', time: '10:00 PM', stage: 'Group Stage', group: 'D', home: 'Turkiye', away: 'USA', stadium: 'SoFi Stadium', city: 'Los Angeles', country: 'United States' },
  { id: 60, date: 'Thu, Jun 25', time: '10:00 PM', stage: 'Group Stage', group: 'D', home: 'Paraguay', away: 'Australia', stadium: "Levi's Stadium", city: 'San Francisco Bay Area', country: 'United States' },
  { id: 61, date: 'Fri, Jun 26', time: '3:00 PM', stage: 'Group Stage', group: 'I', home: 'Norway', away: 'France', stadium: 'Gillette Stadium', city: 'Boston', country: 'United States' },
  { id: 62, date: 'Fri, Jun 26', time: '3:00 PM', stage: 'Group Stage', group: 'I', home: 'Senegal', away: 'Iraq', stadium: 'BMO Field', city: 'Toronto', country: 'Canada' },
  { id: 63, date: 'Fri, Jun 26', time: '8:00 PM', stage: 'Group Stage', group: 'H', home: 'Cape Verde', away: 'Saudi Arabia', stadium: 'NRG Stadium', city: 'Houston', country: 'United States' },
  { id: 64, date: 'Fri, Jun 26', time: '7:00 PM', stage: 'Group Stage', group: 'H', home: 'Uruguay', away: 'Spain', stadium: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico' },
  { id: 65, date: 'Fri, Jun 26', time: '11:00 PM', stage: 'Group Stage', group: 'G', home: 'Egypt', away: 'Iran', stadium: 'Lumen Field', city: 'Seattle', country: 'United States' },
  { id: 66, date: 'Fri, Jun 26', time: '11:00 PM', stage: 'Group Stage', group: 'G', home: 'New Zealand', away: 'Belgium', stadium: 'BC Place', city: 'Vancouver', country: 'Canada' },
  { id: 67, date: 'Sat, Jun 27', time: '5:00 PM', stage: 'Group Stage', group: 'L', home: 'Panama', away: 'England', stadium: 'MetLife Stadium', city: 'New York/New Jersey', country: 'United States' },
  { id: 68, date: 'Sat, Jun 27', time: '5:00 PM', stage: 'Group Stage', group: 'L', home: 'Croatia', away: 'Ghana', stadium: 'Lincoln Financial Field', city: 'Philadelphia', country: 'United States' },
  { id: 69, date: 'Sat, Jun 27', time: '7:30 PM', stage: 'Group Stage', group: 'K', home: 'Colombia', away: 'Portugal', stadium: 'Hard Rock Stadium', city: 'Miami', country: 'United States' },
  { id: 70, date: 'Sat, Jun 27', time: '7:30 PM', stage: 'Group Stage', group: 'K', home: 'DR Congo', away: 'Uzbekistan', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'United States' },
  { id: 71, date: 'Sat, Jun 27', time: '10:00 PM', stage: 'Group Stage', group: 'J', home: 'Algeria', away: 'Austria', stadium: 'Arrowhead Stadium', city: 'Kansas City', country: 'United States' },
  { id: 72, date: 'Sat, Jun 27', time: '10:00 PM', stage: 'Group Stage', group: 'J', home: 'Jordan', away: 'Argentina', stadium: 'AT&T Stadium', city: 'Dallas', country: 'United States' },
];

export const knockoutEntryMatches: Match[] = [
  { id: 73, date: 'Sun, Jun 28', time: '3:00 PM', stage: 'Round of 32', home: 'Runner-up A', away: 'Runner-up B', stadium: 'SoFi Stadium', city: 'Los Angeles', country: 'United States' },
  { id: 74, date: 'Mon, Jun 29', time: '1:00 PM', stage: 'Round of 32', home: 'Winner C', away: 'Runner-up F', stadium: 'NRG Stadium', city: 'Houston', country: 'United States' },
  { id: 75, date: 'Mon, Jun 29', time: '4:30 PM', stage: 'Round of 32', home: 'Winner E', away: 'Best 3rd', stadium: 'Gillette Stadium', city: 'Boston', country: 'United States' },
  { id: 76, date: 'Mon, Jun 29', time: '9:00 PM', stage: 'Round of 32', home: 'Winner F', away: 'Runner-up C', stadium: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico' },
  { id: 77, date: 'Tue, Jun 30', time: '1:00 PM', stage: 'Round of 32', home: 'Runner-up E', away: 'Runner-up I', stadium: 'AT&T Stadium', city: 'Dallas', country: 'United States' },
  { id: 78, date: 'Tue, Jun 30', time: '5:00 PM', stage: 'Round of 32', home: 'Winner I', away: 'Best 3rd', stadium: 'MetLife Stadium', city: 'New York/New Jersey', country: 'United States' },
  { id: 79, date: 'Tue, Jun 30', time: '9:00 PM', stage: 'Round of 32', home: 'Winner A', away: 'Best 3rd', stadium: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico' },
  { id: 80, date: 'Wed, Jul 1', time: '12:00 PM', stage: 'Round of 32', home: 'Winner L', away: 'Best 3rd', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'United States' },
  { id: 81, date: 'Wed, Jul 1', time: '4:00 PM', stage: 'Round of 32', home: 'Winner G', away: 'Best 3rd', stadium: 'Lumen Field', city: 'Seattle', country: 'United States' },
  { id: 82, date: 'Wed, Jul 1', time: '8:00 PM', stage: 'Round of 32', home: 'Winner D', away: 'Best 3rd', stadium: "Levi's Stadium", city: 'San Francisco Bay Area', country: 'United States' },
  { id: 83, date: 'Thu, Jul 2', time: '3:00 PM', stage: 'Round of 32', home: 'Winner H', away: 'Runner-up J', stadium: 'SoFi Stadium', city: 'Los Angeles', country: 'United States' },
  { id: 84, date: 'Thu, Jul 2', time: '7:00 PM', stage: 'Round of 32', home: 'Runner-up K', away: 'Runner-up L', stadium: 'BMO Field', city: 'Toronto', country: 'Canada' },
  { id: 85, date: 'Thu, Jul 2', time: '11:00 PM', stage: 'Round of 32', home: 'Winner B', away: 'Best 3rd', stadium: 'BC Place', city: 'Vancouver', country: 'Canada' },
  { id: 86, date: 'Fri, Jul 3', time: '2:00 PM', stage: 'Round of 32', home: 'Runner-up D', away: 'Runner-up G', stadium: 'AT&T Stadium', city: 'Dallas', country: 'United States' },
  { id: 87, date: 'Fri, Jul 3', time: '6:00 PM', stage: 'Round of 32', home: 'Winner J', away: 'Runner-up H', stadium: 'Hard Rock Stadium', city: 'Miami', country: 'United States' },
  { id: 88, date: 'Fri, Jul 3', time: '9:30 PM', stage: 'Round of 32', home: 'Winner K', away: 'Best 3rd', stadium: 'Arrowhead Stadium', city: 'Kansas City', country: 'United States' },
];

export const lateStageMatches: Match[] = [
  { id: 89, date: 'Sat, Jul 4', time: '1:00 PM', stage: 'Round of 16', home: 'Winner 73', away: 'Winner 75', stadium: 'NRG Stadium', city: 'Houston', country: 'United States' },
  { id: 90, date: 'Sat, Jul 4', time: '5:00 PM', stage: 'Round of 16', home: 'Winner 74', away: 'Winner 77', stadium: 'Lincoln Financial Field', city: 'Philadelphia', country: 'United States' },
  { id: 91, date: 'Sun, Jul 5', time: '4:00 PM', stage: 'Round of 16', home: 'Winner 76', away: 'Winner 78', stadium: 'MetLife Stadium', city: 'New York/New Jersey', country: 'United States' },
  { id: 92, date: 'Sun, Jul 5', time: '8:00 PM', stage: 'Round of 16', home: 'Winner 79', away: 'Winner 80', stadium: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico' },
  { id: 93, date: 'Mon, Jul 6', time: '3:00 PM', stage: 'Round of 16', home: 'Winner 83', away: 'Winner 84', stadium: 'AT&T Stadium', city: 'Dallas', country: 'United States' },
  { id: 94, date: 'Mon, Jul 6', time: '8:00 PM', stage: 'Round of 16', home: 'Winner 81', away: 'Winner 82', stadium: 'Lumen Field', city: 'Seattle', country: 'United States' },
  { id: 95, date: 'Tue, Jul 7', time: '12:00 PM', stage: 'Round of 16', home: 'Winner 86', away: 'Winner 88', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'United States' },
  { id: 96, date: 'Tue, Jul 7', time: '4:00 PM', stage: 'Round of 16', home: 'Winner 85', away: 'Winner 87', stadium: 'BC Place', city: 'Vancouver', country: 'Canada' },
  { id: 97, date: 'Thu, Jul 9', time: '4:00 PM', stage: 'Quarterfinal', home: 'Winner 89', away: 'Winner 90', stadium: 'Gillette Stadium', city: 'Boston', country: 'United States' },
  { id: 98, date: 'Fri, Jul 10', time: '3:00 PM', stage: 'Quarterfinal', home: 'Winner 93', away: 'Winner 94', stadium: 'SoFi Stadium', city: 'Los Angeles', country: 'United States' },
  { id: 99, date: 'Sat, Jul 11', time: '5:00 PM', stage: 'Quarterfinal', home: 'Winner 91', away: 'Winner 92', stadium: 'Hard Rock Stadium', city: 'Miami', country: 'United States' },
  { id: 100, date: 'Sat, Jul 11', time: '9:00 PM', stage: 'Quarterfinal', home: 'Winner 95', away: 'Winner 96', stadium: 'Arrowhead Stadium', city: 'Kansas City', country: 'United States' },
  { id: 101, date: 'Tue, Jul 14', time: '3:00 PM', stage: 'Semifinal', home: 'Winner 97', away: 'Winner 98', stadium: 'AT&T Stadium', city: 'Dallas', country: 'United States' },
  { id: 102, date: 'Wed, Jul 15', time: '3:00 PM', stage: 'Semifinal', home: 'Winner 99', away: 'Winner 100', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'United States' },
  { id: 103, date: 'Sat, Jul 18', time: '5:00 PM', stage: 'Third Place', home: 'Loser 101', away: 'Loser 102', stadium: 'Hard Rock Stadium', city: 'Miami', country: 'United States' },
  { id: 104, date: 'Sun, Jul 19', time: '3:00 PM', stage: 'Final', home: 'Winner 101', away: 'Winner 102', stadium: 'MetLife Stadium', city: 'New York/New Jersey', country: 'United States' },
];

export const allMatches = [...groupStageMatches, ...knockoutEntryMatches, ...lateStageMatches];

export function getAllTeams() {
  const teamSet = new Set<string>();
  groupStageMatches.forEach((match) => {
    teamSet.add(match.home);
    teamSet.add(match.away);
  });
  return Array.from(teamSet).sort((a, b) => a.localeCompare(b));
}

export function getTeamMatches(teamName: string) {
  return groupStageMatches.filter((match) => match.home === teamName || match.away === teamName);
}

export function getTeamBySlugFromSchedule(slug: string) {
  return getAllTeams().find((team) => generateSlug(team) === slug);
}

export function getCitySlug(city: string) {
  return generateSlug(city);
}

export function getAllCities() {
  return Array.from(new Set(allMatches.map((match) => match.city)))
    .sort((a, b) => a.localeCompare(b));
}

export function getCityBySlug(slug: string) {
  return getAllCities().find((city) => getCitySlug(city) === slug);
}

export function getCityMatches(city: string) {
  return allMatches.filter((match) => match.city === city);
}

export function getGroupStageMatchSlug(match: Match) {
  return `${generateSlug(`${match.home} vs ${match.away}`)}-world-cup-2026-match-${match.id}`;
}

export function getGroupStageMatchBySlug(slug: string) {
  return groupStageMatches.find((match) => getGroupStageMatchSlug(match) === slug);
}

export function getGroupForTeam(teamName: string) {
  return getTeamMatches(teamName)[0]?.group || '';
}

export function getRoundOf32Route(group: string) {
  if (!group) return [];
  const winner = knockoutEntryMatches.find((match) => match.home === `Winner ${group}` || match.away === `Winner ${group}`);
  const runnerUp = knockoutEntryMatches.find((match) => match.home === `Runner-up ${group}` || match.away === `Runner-up ${group}`);
  return [
    winner && { label: 'If group winner', match: winner },
    runnerUp && { label: 'If group runner-up', match: runnerUp },
  ].filter(Boolean) as { label: string; match: Match }[];
}

export function getMatchById(id: number) {
  return allMatches.find((match) => match.id === id);
}

export function getNextMatchForWinner(matchId: number) {
  return allMatches.find(
    (match) => match.home === `Winner ${matchId}` || match.away === `Winner ${matchId}`,
  );
}

export function getNextMatchForLoser(matchId: number) {
  return allMatches.find(
    (match) => match.home === `Loser ${matchId}` || match.away === `Loser ${matchId}`,
  );
}

export function getCountryFlag(country: Match['country']) {
  if (country === 'Canada') return 'CAN';
  if (country === 'Mexico') return 'MEX';
  return 'USA';
}
