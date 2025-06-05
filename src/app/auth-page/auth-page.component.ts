import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {

  loginForm: FormGroup;
  registerForm: FormGroup;
  isLogin: boolean = true;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      deviceId: 'admin-web',
        deviceName: 'web'
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required] ],
      confirmPassword: ['', Validators.required],
      
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmitLogin() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      //console.log('Login:', this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe((response: any)=>{
        this.isLoading = false;
        if( response.data?.user_data.role !== 'user' ){
          setTimeout(async () => {
            // localStorage.setItem('userData', JSON.stringify(response?.data?.user_data));
            await localStorage.setItem('auth_token', response?.data?.token);
            this.router.navigateByUrl('/dashboard/dashboard')
          }, 1000);
          
        }
        // alert('You do not have admin access')
        //console.log(response)
      },(error)=>{
        this.isLoading = false;
        alert(error.error.message)
      })
    }
  }

  onSubmitRegister() {
    this.isLoading = true;
    //console.log(this.registerForm.value)
    if (this.registerForm.valid) {
      this.isLoading = false;
      //console.log('Register:', this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe((res: any)=>{
        //console.log(res)
        if(res.success){
          alert('Registration completed. Proceed to login')
          this.isLogin = !this.isLogin

        }
      },(error)=>{
        this.isLoading = false;
      })
    }
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }
}
