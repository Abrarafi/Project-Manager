import { Component } from '@angular/core';
import { BoardHeaderComponent } from '../../features/board/components/board-header/board-header.component';
import { ColumnDialogComponent } from '../../shared/dialogs/column-dialog/column-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Board, BoardMember } from '../../shared/models/board.model';

@Component({
  selector: 'app-board-view',
  imports: [BoardHeaderComponent],
  templateUrl: './board-view.component.html',
  styleUrl: './board-view.component.scss',
})
export class BoardViewComponent {
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

  constructor(private dialog: MatDialog) {}
  onBack(): void {
    // Logic to handle back navigation
    console.log('Back button clicked');
  }

  onInviteMember(): void {
    // Logic to handle inviting a new member
    console.log('Invite member clicked');
  }

  onAddColumn(): void {
    const dialogRef = this.dialog.open(ColumnDialogComponent, {
      width: '500px',
      data: { mode: 'create', boardId: this.board.id },
    });
    console.log('Add column clicked');
  }
}
