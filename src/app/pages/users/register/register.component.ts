import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { IUser } from '../../../models/user.model';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private _userService = inject(UserService);
  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);

  registerError: String = '';
  loading: boolean = false;

  registerForm = this._formBuilder.group({
    nameUser: ['', [Validators.required]],
    emailUser: ['', [Validators.required, Validators.email]],
    passUser: ['', [Validators.required]],
    userRol: [2]
  });

  register() {
    this.registerError = '';
    this.loading = true;
    if (this.registerForm.valid) {
      this._userService.saveUser(this.registerForm.value as IUser).subscribe({
        next: ( response )=>{
          this.registerForm.reset();
          this._router.navigateByUrl('/login');
        },
        error: ( error )=>{
          this.registerError = error;
          this.loading = false;
        },
        complete: ()=>{
          this.loading = false;
          Swal.fire({
            icon: "success",
            title: "Registro Exitoso!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
    } else {
      this.loading = false;
      this.registerForm.markAllAsTouched();
      this.registerError = 'Complete todos los campos';
    }
  }


  get getName() {
    return this.registerForm.controls.nameUser;
  }

  get getEmail() {
    return this.registerForm.controls.emailUser;
  }

  get getClave() {
    return this.registerForm.controls.passUser;
  }


}
