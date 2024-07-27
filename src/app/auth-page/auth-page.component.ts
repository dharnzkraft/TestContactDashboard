import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {

  loginForm: FormGroup;
  registerForm: FormGroup;
  isLogin: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmitLogin() {
    if (this.loginForm.valid) {
      console.log('Login:', this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe((response: any)=>{
        console.log(response)
      })
    }
  }

  onSubmitRegister() {
    if (this.registerForm.valid) {
      console.log('Register:', this.registerForm.value);
    }
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }
}
