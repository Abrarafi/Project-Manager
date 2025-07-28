import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})


export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage: string | null = null;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rememberMe: [false]
  });
  }


  ngOnInit(): void {}


  async onSubmit() {
    
    if(this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      console.log('Form submitted:', "invalid form");
      return;
    }
    console.log('Form submitted:', this.loginForm.value);
      this.isLoading = true;
      this.errorMessage = null;
     const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'An error occurred during login. Please try again.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  get emailFormControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get passwordFormControl(): FormControl {
    return this.loginForm.get('password') as FormControl; 
  }
}
