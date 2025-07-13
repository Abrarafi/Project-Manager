import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate } from '@angular/animations';
import { ClickOutsideDirective } from '../../../../shared/directives/click-outside.directive';

@Component({
  selector: 'app-board-header',
  imports: [MatIconModule, CommonModule, ],
  templateUrl: './board-header.component.html',
  styleUrl: './board-header.component.scss',
  animations: [
    trigger('menuAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('120ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate(
          '100ms ease-in',
          style({ opacity: 0, transform: 'scale(0.95)' })
        ),
      ]),
    ]),
  ],
})
export class BoardHeaderComponent {
  @Input() boardTitle: string | undefined = 'Board Name Not Found';
  @Input() isProcessing: boolean = false;

  isMembersListOpen: boolean = false;
  isBoardSettingsOpen: boolean = false;
  isShareDropdownOpen: boolean = false;
  showActions: boolean = true;
  isMenuOpen: boolean = false;

  constructor(private elementRef: ElementRef) {}


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMembersListOpen = false;
    this.isBoardSettingsOpen = false;
    this.isShareDropdownOpen = false;
    this.isMenuOpen = false;
    }
  }

  onBack(): void {
    // Logic to handle back navigation
    console.log('Back button clicked');
  }
  toggleMembersList(): void {
    // Logic to toggle members list visibility
    console.log('Toggle members list clicked');
  }
  toggleBoardSettings(): void {
    // Logic to toggle board settings visibility
    console.log('Toggle board settings clicked');
  }
  toggleShareDropdown(): void {
    // Logic to toggle share dropdown visibility
    console.log('Toggle share dropdown clicked');
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
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Menu toggled:', this.isMenuOpen);
  }
  
}
