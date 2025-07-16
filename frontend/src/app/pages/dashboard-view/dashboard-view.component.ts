import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Board } from '../../shared/models/board.model';
import { User } from '../../shared/models/user.model';
@Component({
  selector: 'app-dashboard-view',
  imports: [MatIconModule],
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.scss'
})
export class DashboardViewComponent {
  boards: Board[] = [];
  userProfile !: User;
  userProfileMenuOpen = false;

    toggleProfileMenu() {
        // Logic to toggle the profile menu
    }
    openProfileSettings() {
        // Logic to open profile settings
    }
    logout() { 
        // Logic to log out the user
    }
    createNewBoard() {
        // Logic to create a new board
    }
    openBoardSettings() {
        // Logic to open board settings
    }
    openBoard(boardId: string) {
        // Logic to open a specific board by its ID
    }
    formatDate(date: Date): string {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }
    

}
