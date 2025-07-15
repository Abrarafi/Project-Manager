import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Column } from '../../models/column.model';

@Component({
  selector: 'app-column-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './column-dialog.component.html',
  styleUrl: './column-dialog.component.scss',
})
export class ColumnDialogComponent {
  columnForm: FormGroup;
  colorOptions = [
    { value: '#60A5FA', name: 'Blue' },
    { value: '#34D399', name: 'Green' },
    { value: '#F87171', name: 'Red' },
    { value: '#FBBF24', name: 'Yellow' },
    { value: '#A78BFA', name: 'Purple' },
    { value: '#EC4899', name: 'Pink' },
  ];
  constructor(
    private dialogRef: MatDialogRef<ColumnDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { mode: 'create' | 'edit'; boardId: string; column?: Column },
    private fb: FormBuilder
  ) {
    this.columnForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      wip: [0, [Validators.min(0)]], // Work in progress limit
      color: ['#E2E8F0'], // Default color
    });
    if (data.mode === 'edit' && data.column) {
      this.columnForm.patchValue({
        name: data.column.name,
        description: data.column.description,
        wip: data.column.wip,
        color: data.column.color,
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.columnForm.valid) {
      const formValue = this.columnForm.value;
      const column: Partial<Column> = {
        name: formValue.name,
        description: formValue.description || '',
        wip: formValue.wip,
        color: formValue.color,
        boardId: this.data.boardId,
        cards: [],
        updatedAt: new Date(),
      };

      if (this.data.mode === 'create') {
        column.id = Date.now().toString();
        column.createdAt = new Date();
      } else if (this.data.column) {
        column.id = this.data.column.id;
        column.createdAt = this.data.column.createdAt;
        column.cards = this.data.column.cards;
      }

      console.log('Submitting column:', column);
      this.dialogRef.close(column);
    }
  }

  selectColor(color: string): void {
    this.columnForm.patchValue({ color });
  }
}
