/**
 * Admin Dashboard Data Models
 * Represents the structures of aggregated data from the memory backend
 */

export interface AggregateData {
  totalGames: number;
  totalPlayers: number;
  apis: ApiUsage[];
}

export interface ApiUsage {
  name: string;
  count: number;
}

export interface PlayerInfo {
  username: string;
  email: string;
}

export interface DayStats {
  [date: string]: number; // e.g., { "2026-06-28": 5 }
}

export interface GameRecord {
  id: number;
  playerId: number;
  playerName: string;
  api: string;
  playedAt: string;
  duration?: number;
  score?: number;
}

export interface AdminDashboardData {
  aggregate: AggregateData;
  players: PlayerInfo[];
  dateStats: DayStats;
  games: GameRecord[];
}
