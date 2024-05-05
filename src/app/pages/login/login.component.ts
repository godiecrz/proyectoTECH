import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private _router = inject(Router);
  private _apiService = inject(ApiService);

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]]
    });
  }


  login(event: Event) {
    event.preventDefault();
    console.log(this.loginForm.value);//retorna objeto con la infor de los campos
    const email = this.loginForm.get('email')?.value;
    const clave = this.loginForm.get('clave')?.value;

    const userData = {
      email: email,
      clave: clave
    };

    console.log(JSON.stringify(userData)); //convierte userData en JSON

    if (email == 'root' && clave == 'root') {
      this._apiService.token = '123';
      this._router.navigate(['/home']);
    }

  }

}
