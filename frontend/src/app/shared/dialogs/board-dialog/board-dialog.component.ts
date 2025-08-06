import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { User } from '../../models/user.model';
import { UserService } from '../../../core/services/user.service';
import { debounceTime, switchMap, filter, catchError, of } from 'rxjs';
import { BoardMember } from '../../models/board.model';

@Component({
  selector: 'app-board-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  templateUrl: './board-dialog.component.html',
  styleUrl: './board-dialog.component.scss',
})
export class BoardDialogComponent implements OnInit {
  boardForm: FormGroup;
  colorOptions = [
    { value: '#60A5FA', name: 'Blue' },
    { value: '#34D399', name: 'Green' },
    { value: '#F87171', name: 'Red' },
    { value: '#FBBF24', name: 'Yellow' },
    { value: '#A78BFA', name: 'Purple' },
    { value: '#EC4899', name: 'Pink' },
  ];
  filteredUsers: User[] = [];
  selectedMembers: BoardMember[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BoardDialogComponent>,
    private userService: UserService
  ) {
    this.boardForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      memberSearchControl: [''],
      thumbnailColor: ['#A78BFA'],
    });
  }

  ngOnInit() {
    this.boardForm
      .get('memberSearchControl')
      ?.valueChanges.pipe(
        debounceTime(300), // wait for 300ms after typing stops
        filter((query: string) => !!query && query.trim().length >= 2), // Only search if query is at least 2 characters
        switchMap((query: string) => {
          this.isLoading = true;
          return this.userService.searchUsers(query.trim()).pipe(
            catchError((error) => {
              console.error('Error searching users:', error);
              this.isLoading = false;
              return of([]);
            })
          );
        })
      )
      .subscribe((users) => {
        this.filteredUsers = users.filter(
          (user) =>
            !this.selectedMembers.some((member) => member.id === user.id)
        );
        this.isLoading = false;
      });
  }

  addMember(user: User) {
    if (!this.selectedMembers.some((m) => m.id === user.id)) {
      const newMember: BoardMember = {
        id: user.id,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar || '', // Use user's avatar or a default one
        },
        role: 'member', // Default role can be set here
      };
      this.selectedMembers.push(newMember);
      this.boardForm.patchValue({ memberSearchControl: '' }); // Clear the search input
      this.filteredUsers = this.filteredUsers.filter(
        (u) => u.id !== user.id
      ); // Remove the added user from the filtered list
    }
    this.boardForm.patchValue({ memberSearchControl: '' }); // Clear the search input
    this.filteredUsers = []; // Clear filtered users
  }

  removeMember(userId: string) {
    this.selectedMembers = this.selectedMembers.filter(
      (member) => member.id !== userId
    );
  }

  @HostListener('window:keyup.esc')
  onEscKeyUp() {
    this.onCancel();
  }

 onSubmit() {
  if (this.boardForm.valid) {
    const formValues = this.boardForm.value;
    const boardData = {
      ...this.boardForm.value,
      members: this.selectedMembers.map((member) => ({
        id: member.id,
        name: member.user.name,
        email: member.user.email,
        role: member.role,
        avatar: member.user.avatar || '',
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
      lastModified: new Date(),
      columns: [], // Initialize with empty columns or set default columns if needed
    };

    console.log('Board Data:', boardData);
    this.dialogRef.close(boardData);
  } else {
    console.error('Form is invalid');
  }
}


  onCancel() {
    this.dialogRef.close();
  }

  selectColor(color: string) {
    this.boardForm.patchValue({ thumbnailColor: color });
  }
}
