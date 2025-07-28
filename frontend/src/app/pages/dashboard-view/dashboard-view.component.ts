import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Board } from '../../shared/models/board.model';
import { User } from '../../shared/models/user.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard-view',
  imports: [MatIconModule, CommonModule, ],
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.scss'
})
export class DashboardViewComponent implements OnInit {
  boards: Board[] = [];
  userProfile: User | null = null;
  userProfileMenuOpen = false;
  isProfileMenuOpen = false;
    constructor() {

    }
    ngOnInit() {
        this.loadUserProfile();
        this.loadBoards();
    }
    loadUserProfile() {
        // Logic to load user profile
        this.userProfile = {
            id: '1',
            email: 'user@example.com',
            firstName: 'John',
            lastName: 'Doe',
            avatar: 'JD'
        };
    }
    loadBoards() {
        // Logic to load boards
        this.boards = [
            {
                id: '1',
                name: 'Board 1',
                description: 'Description for Board 1',
                lastModified: new Date(),
                members: [],
                thumbnailColor: '#FF5733',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: '2',
                name: 'Board 2',
                description: 'Description for Board 2',
                lastModified: new Date(),
                members: [],
                thumbnailColor: '#33FF57',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];
    }
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
