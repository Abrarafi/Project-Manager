import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor(private fb: FormBuilder, private router: RouterModule) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  async onSubmit() {
   if (this.registerForm.valid) {
     this.isLoading = true;
     // Simulate API call
     await new Promise((resolve) => setTimeout(resolve, 2000));
     console.log('Registration successful');
     this.isLoading = false;
   }
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  get emailFormControl(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get passwordFormControl(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get confirmPasswordFormControl(): FormControl {
    return this.registerForm.get('confirmPassword') as FormControl;
  }
}
