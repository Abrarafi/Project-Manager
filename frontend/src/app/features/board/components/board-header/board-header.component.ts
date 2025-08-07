import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ClickOutsideDirective } from '../../../../shared/directives/click-outside.directive';
import { BoardMemberService } from '../../../../core/services/board-member.service';
import { BoardMember } from '../../../../shared/models/board.model';
import e from 'express';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board-header',
  imports: [MatIconModule, CommonModule, ClickOutsideDirective],
  templateUrl: './board-header.component.html',
  styleUrl: './board-header.component.scss',
})
export class BoardHeaderComponent implements OnInit {
  @Input() boardTitle: string | undefined = 'Board Name Not Found';
  @Input() isProcessing: boolean = false;
  @Input() showActions: boolean = true; // Controls visibility of action buttons
  @Output() back = new EventEmitter<void>();
  @Output() inviteMember = new EventEmitter<void>();
  @Output() addColumn = new EventEmitter<void>();

  isMembersListOpen: boolean = false;
  isBoardSettingsOpen: boolean = false;
  isShareDropdownOpen: boolean = false;
  isMenuOpen: boolean = false;

  members: BoardMember[] = [];

  constructor(
    private elementRef: ElementRef,
    private boardMemberService: BoardMemberService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const boardId = this.route.snapshot.paramMap.get('id');
    if (!boardId) {
      console.error('Board ID is not available');
      return;
    }
    this.boardMemberService.getMembers(boardId).subscribe((members) => {
      this.members = members;
    });
    console.log(this.members);
  }

  onBack(): void {
    this.back.emit();
  }

  onInviteMember(): void {
    this.inviteMember.emit();
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
    this.addColumn.emit();
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
  }
  toggleShareDropdown(): void {
    this.isShareDropdownOpen = !this.isShareDropdownOpen;
  }
}
