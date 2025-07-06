import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';

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

  constructor(private fb: FormBuilder) {
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
      return;
    }
      this.isLoading = true;
      // Simulate a login request
      setTimeout(() => {
        this.isLoading = false;
        console.log('User logged in:', this.loginForm.value);
      }, 2000);
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
