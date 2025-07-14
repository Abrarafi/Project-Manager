import { Component } from '@angular/core';
import { BoardHeaderComponent } from "../../features/board/components/board-header/board-header.component";


@Component({
  selector: 'app-board-view',
  imports: [BoardHeaderComponent],
  templateUrl: './board-view.component.html',
  styleUrl: './board-view.component.scss'
})
export class BoardViewComponent {
  onBack(): void {
    // Logic to handle back navigation
    console.log('Back button clicked');
  }

  onInviteMember(): void {
    // Logic to handle inviting a new member
    console.log('Invite member clicked');
  }

  onAddColumn(): void {
    // Logic to handle adding a new column
    console.log('Add column clicked');
  }

}
