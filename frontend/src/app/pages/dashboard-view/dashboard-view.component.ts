import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Board } from '../../shared/models/board.model';
import { User } from '../../shared/models/user.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { BoardDialogComponent } from '../../shared/dialogs/board-dialog/board-dialog.component';
import { DashboardService } from '../../core/services/dashboard.service';
import { ClickOutsideDirective } from '../../shared/directives/click-outside.directive';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-view',
  imports: [MatIconModule, CommonModule, ClickOutsideDirective],
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
  openedMemberBoardId: string | null = null;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private dashboardService: DashboardService,
    private router: Router
  ) {
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
      },
      error: (error) => {
        console.error('Error loading user profile:', error);
        this.userProfile = null;
      },
    });
  }
  toggleMembersList(boardId: string) {
    this.openedMemberBoardId =
      this.openedMemberBoardId === boardId ? null : boardId;
  }
  isMembersListOpen(boardId: string): boolean {
    return this.openedMemberBoardId === boardId;
  }
  loadBoards() {
    this.dashboardService.getBoards().subscribe({
      next: (boards) => {
        this.boards = boards;
      },
      error: (error) => {
        console.error('Error loading boards:', error);
        this.boards = [];
      },
    });
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
        console.log("result",result)
        this.dashboardService.createBoard(result).subscribe({
          next: (newBoard) => {
            console.log('New board created:', newBoard);
            this.boards.push(newBoard); // Add the new board to the list
            this.router.navigate(['/board', newBoard.id]); // Navigate to the new board
          },
          error: (error) => {
            console.error('Error creating board:', error);
          },
        });
      } else {
        console.log('Board creation cancelled');
      }
    });
    // Logic to create a new board
  }
  openBoardSettings() {
    // Logic to open board settings
  }
  openBoard(boardId: string | undefined): void {
    if (boardId) {
      this.router.navigate(['/board', boardId]);
    } else {
      console.error('Board ID is undefined');
    }
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
      year: 'numeric',
    });
  }
}
