import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Board } from '../../shared/models/board.model';
import { User } from '../../shared/models/user.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { BoardDialogComponent } from '../../shared/dialogs/board-dialog/board-dialog.component';
@Component({
  selector: 'app-dashboard-view',
  imports: [MatIconModule, CommonModule],
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.scss',
})
export class DashboardViewComponent implements OnInit {
  board: Board = {
    id: '',
    name: '',
    description: '',
    columns: [],
    lastModified: new Date(),
    members: [],
    thumbnailColor: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  // Initialize the boards array
  boards: Board[] = [];
  userProfile: User | null = null;
  userProfileMenuOpen = false;
  isProfileMenuOpen = false;
  isMembersListOpen = false;
  
  constructor(private authService: AuthService, private dialog: MatDialog) {
    // Initialize the component
  }
  ngOnInit() {
    this.loadUserProfile();
    this.loadBoards();
  }
  loadUserProfile() {
    this.authService.getProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
        console.log('User profile loaded:', this.userProfile);
      },
      error: (error) => {
        console.error('Error loading user profile:', error);
        this.userProfile = null;
      },
    });
    

  }
  toggleMembersList() {
    this.isMembersListOpen = !this.isMembersListOpen;
  }
  loadBoards() {
    // Logic to load boards
    this.boards = [];
  }
  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }
  openProfileSettings() {
    // Logic to open profile settings
  }
  logout() {
    // Logic to log out the user
    this.authService.logout();
    console.log('User logged out');
  }
  createNewBoard() {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '500px',
      disableClose: false,
      hasBackdrop: true,
      backdropClass: 'backdrop-blur-sm',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Logic to handle the result from the dialog
        console.log('New board created:', result);
        this.boards.push(result); 
        console.log(this.boards)// Add the new board to the list
      } else {
        console.log('Board creation cancelled');
      }
    });
    // Logic to create a new board
  }
  openBoardSettings() {
    // Logic to open board settings
  }
  openBoard(boardId: string) {
    // Logic to open a specific board by its ID
  }
  // formatDate(date: Date): string {
  //   return date.toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit',
  //   });
  // }
  formatDate(date: Date): string {
    // console.log('Formatting date:', date);
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
}
