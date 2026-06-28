import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';
import { AdminDashboardData } from '../../models/admin.model';
import { StatsCardComponent } from '../stats-card/stats-card.component';
import { ApiChartComponent } from '../api-chart/api-chart.component';
import { GamesChartComponent } from '../games-chart/games-chart.component';
import { PlayersListComponent } from '../players-list/players-list.component';
import { HeaderComponent } from '../header/header.component';

/**
 * DashboardComponent serves as the main admin dashboard
 * Displays aggregated data through various visualizations and components
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StatsCardComponent,
    ApiChartComponent,
    GamesChartComponent,
    PlayersListComponent,
    HeaderComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardData: AdminDashboardData | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load all dashboard data from the admin service
   */
  loadDashboardData(): void {
    this.isLoading = true;
    this.errorMessage = '';
    console.log('Starting dashboard data load...');

    this.adminService.getAllDashboardData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log('Dashboard data received:', data);
          console.log('Before assignment - isLoading:', this.isLoading);
          this.dashboardData = data;
          this.isLoading = false;
          console.log('After assignment - isLoading:', this.isLoading);
          console.log('dashboardData:', this.dashboardData);
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Failed to load dashboard data:', error);
          this.isLoading = false;
          
          if (error.status === 401) {
            this.errorMessage = 'Unauthorized. Your session may have expired.';
            setTimeout(() => this.logout(), 2000);
          } else {
            this.errorMessage = 'Failed to load dashboard data. Please try again.';
          }
          this.cdr.markForCheck();
        }
      });
  }

  /**
   * Refresh dashboard data
   */
  refreshData(): void {
    this.loadDashboardData();
  }

  /**
   * Logout user and navigate to login
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
