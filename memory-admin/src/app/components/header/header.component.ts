import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * HeaderComponent displays the application header with navigation and controls
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() onLogout = new EventEmitter<void>();
  @Output() onRefresh = new EventEmitter<void>();
  isRefreshing: boolean = false;

  /**
   * Emit logout event
   */
  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.onLogout.emit();
    }
  }

  /**
   * Emit refresh event
   */
  refreshData(): void {
    this.isRefreshing = true;
    this.onRefresh.emit();
    setTimeout(() => {
      this.isRefreshing = false;
    }, 2000);
  }
}
