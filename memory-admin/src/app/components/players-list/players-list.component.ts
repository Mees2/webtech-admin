import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerInfo } from '../../models/admin.model';

/**
 * PlayersListComponent displays a searchable list of registered players
 * Shows username and email for each player
 */
@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.scss'
})
export class PlayersListComponent {
  @Input() players: PlayerInfo[] = [];
  searchQuery: string = '';
  sortBy: 'username' | 'email' = 'username';

  /**
   * Get filtered and sorted players based on search query and sort option
   */
  get filteredPlayers(): PlayerInfo[] {
    let filtered = this.players;

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.username.toLowerCase().includes(query) ||
        p.email.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      if (this.sortBy === 'username') {
        return a.username.localeCompare(b.username);
      } else {
        return a.email.localeCompare(b.email);
      }
    });
  }

  /**
   * Handle search input
   */
  onSearchChange(event: any): void {
    this.searchQuery = event.target?.value || '';
  }

  /**
   * Handle sort change
   */
  onSortChange(event: any): void {
    const value = event.target?.value;
    if (value === 'username' || value === 'email') {
      this.sortBy = value;
    }
  }
}
