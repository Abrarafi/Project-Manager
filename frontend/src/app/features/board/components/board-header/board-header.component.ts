import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ClickOutsideDirective } from '../../../../shared/directives/click-outside.directive';
import { BoardMemberService } from '../../../../core/services/board-member.service';
import { BoardMember } from '../../../../shared/interfaces/board';

@Component({
  selector: 'app-board-header',
  imports: [MatIconModule, CommonModule, ClickOutsideDirective],
  templateUrl: './board-header.component.html',
  styleUrl: './board-header.component.scss',
})
export class BoardHeaderComponent implements OnInit {
  @Input() boardTitle: string | undefined = 'Board Name Not Found';
  @Input() isProcessing: boolean = false;

  isMembersListOpen: boolean = false;
  isBoardSettingsOpen: boolean = false;
  isShareDropdownOpen: boolean = false;
  showActions: boolean = true;
  isMenuOpen: boolean = false;

  members: BoardMember[] = [];

  constructor(
    private elementRef: ElementRef,
    private boardMemberService: BoardMemberService
  ) {}
  
  ngOnInit(): void {
    this.boardMemberService.getMembers().subscribe((members) => {
      this.members = members;
    });
    console.log(this.members);
  }

  onBack(): void {
    // Logic to handle back navigation
    console.log('Back button clicked');
  }
  
  onInviteMember(): void {
    // Logic to handle inviting a new member
    console.log('Invite member clicked');
  }
  copyBoardLink(): void {
    // Logic to copy board link to clipboard
    console.log('Copy board link clicked');
  }
  onShareBoard(): void {
    // Logic to handle sharing the board
    console.log('Share board clicked');
  }
  onAddColumn(): void {
    // Logic to handle adding a new column
    console.log('Add column clicked');
  }
  onAddCard(): void {
    // Logic to handle adding a new card
    console.log('Add card clicked');
  }
  toggleMembersList(): void {
    this.isMembersListOpen = !this.isMembersListOpen;
  }
  toggleBoardSettings(): void {
    // Logic to toggle board settings visibility
    console.log('Toggle board settings clicked');
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Menu toggled:', this.isMenuOpen);
  }
  toggleShareDropdown(): void {
    this.isShareDropdownOpen = !this.isShareDropdownOpen;
    console.log('Share dropdown toggled:', this.isShareDropdownOpen);
  }
}
