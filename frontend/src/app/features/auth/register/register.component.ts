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
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { passwordMatchValidator } from '../../../shared/validators/password-match.validator';

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
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      { validators: passwordMatchValidator }
    );
  }
  async onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }
    if (this.registerForm.hasError('passwordMismatch')) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;


    try {
      this.authService.register(this.registerForm.value).subscribe({
        next: async () => {
          await this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration error:', error);

         // Handle specific backend error for email already in use
        if (error.status === 400) {
          // Check different possible error message formats
          const backendMessage = error.error?.message || 
                               error.error?.error || 
                               'Email already in use'; // default if none provided
          
          if (backendMessage.toLowerCase().includes('email') && 
              backendMessage.toLowerCase().includes('already')) {
            this.errorMessage = 'This email address is already registered. Please use a different email.';
            this.emailFormControl.setErrors({ emailInUse: true });
          } else {
            this.errorMessage = backendMessage;
          }
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
        },
      });
    } catch (error) {
      this.errorMessage = 'An unexpected error occurred. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  get firstNameFormControl(): FormControl {
    return this.registerForm.get('firstName') as FormControl;
  }

  get lastNameFormControl(): FormControl {
    return this.registerForm.get('lastName') as FormControl;
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
