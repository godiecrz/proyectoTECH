import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';
import { ILoginRequest } from '../../../services/auth/loginRequest';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  private _router = inject(Router);
  private _loginService = inject(LoginService);
  loginError: String = ''
  loading: boolean = false;

  loginForm = this.formBuilder.group({
    emailUser: ['', [Validators.required, Validators.email]],
    claveUser: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {

  }

  get getEmail(){
    return this.loginForm.controls.emailUser;
  }

  get getClave(){
    return this.loginForm.controls.claveUser;
  }


  login() {
    //event.preventDefault();
    //console.log(this.loginForm.value);//retorna objeto con la infor de los campos
    //const email = this.loginForm.get('email')?.value;
    //const clave = this.loginForm.get('clave')?.value;
    this.loginError = '';
    this.loading = true;

    if(this.loginForm.valid){
      this._loginService.login( this.loginForm.value as ILoginRequest).subscribe({
        next: (UserData) => {
          console.log(UserData);//muestra el token, info del usuario
        },
        error: (errorData)=>{
          this.loginError = errorData;
          this.loading = false;
        },
        complete: ()=>{
          this.loading = false;
          if(this._loginService.isAdmin){
            this._router.navigateByUrl('/dashboard');
          }else{
            this._router.navigateByUrl('/home');
          }

          this.loginForm.reset();
        }
      });
    }else{
      this.loading = false;
      this.loginForm.markAllAsTouched();
      this.loginError = 'Complete todos los campos';
    }

  }

}
