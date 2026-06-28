import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';
import { map, tap, finalize } from 'rxjs/operators';
import { 
  AggregateData,
  ApiUsage, 
  PlayerInfo, 
  DayStats, 
  GameRecord,
  AdminDashboardData 
} from '../models/admin.model';
import { AuthService } from './auth.service';

/**
 * AdminService handles API calls to fetch aggregated admin data
 * Communicates with the memory backend admin endpoints
 */
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly API_URL = 'http://localhost:8000/admin';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * Get aggregated statistics (total games, total players, popular APIs)
   */
  getAggregateData(): Observable<AggregateData> {
    const headers = this.authService.getAuthHeader();
    return this.http.get<AggregateData>(`${this.API_URL}/aggregate`, { headers })
      .pipe(
        tap(data => console.log('Aggregate data received:', data))
      );
  }

  /**
   * Get list of all registered players with username and email
   */
  getPlayers(): Observable<PlayerInfo[]> {
    const headers = this.authService.getAuthHeader();
    return this.http.get<PlayerInfo[]>(`${this.API_URL}/players`, { headers })
      .pipe(
        tap(data => console.log('Players data received:', data))
      );
  }

  /**
   * Get game statistics grouped by date
   */
  getDateStats(): Observable<DayStats> {
    const headers = this.authService.getAuthHeader();
    return this.http.get<DayStats>(`${this.API_URL}/dates`, { headers })
      .pipe(
        tap(data => console.log('Date stats received:', data))
      );
  }

  /**
   * Get all played games with details
   */
  getGames(): Observable<GameRecord[]> {
    const headers = this.authService.getAuthHeader();
    return this.http.get<GameRecord[]>(`${this.API_URL}/games`, { headers })
      .pipe(
        tap(data => console.log('Games data received:', data))
      );
  }

  /**
   * Get all admin data in one call
   */
  getAllDashboardData(): Observable<AdminDashboardData> {
    return combineLatest([
      this.getAggregateData(),
      this.getPlayers(),
      this.getDateStats(),
      this.getGames()
    ]).pipe(
      map(([aggregate, players, dateStats, games]) => {
        console.log('Mapping data - aggregate:', aggregate, 'players:', players, 'dateStats:', dateStats, 'games:', games);
        
        // Normalize aggregate data - backend returns array of API usage
        let normalizedAggregate: AggregateData;
        if (Array.isArray(aggregate)) {
          // If aggregate is an array, it's the APIs data
          normalizedAggregate = {
            totalGames: games.length,
            totalPlayers: players.length,
            apis: aggregate as ApiUsage[]
          };
        } else {
          normalizedAggregate = aggregate;
        }
        
        return {
          aggregate: normalizedAggregate,
          players,
          dateStats,
          games
        };
      }),
      finalize(() => console.log('getAllDashboardData observable completed'))
    );
  }
}
