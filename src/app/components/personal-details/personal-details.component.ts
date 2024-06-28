import { Component, inject } from '@angular/core';
import { IUser } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/auth/login.service';
import { environment } from '../../../environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.css'
})
export class PersonalDetailsComponent {

  private _userService = inject(UserService);
  private _formBuilder = inject(FormBuilder);
  private _loginService = inject(LoginService);

  errorMessage: String = "";
  userId: number = 0;
  user?: IUser;
  userLoginOn: boolean = false;
  editMode: boolean = false;

  registerForm = this._formBuilder.group({
    idUser:[0],
    nameUser:['', Validators.required],
    emailUser:[''],
    userRol:[0],
  });

  constructor(){

    this._loginService.dataUserLogin.subscribe({
      next:(dataUser)=>{
        if(dataUser){
          this.userId = parseInt(dataUser!.idUser.toString());
          this.user = dataUser!;
          this.registerForm.controls.idUser.setValue(dataUser!.idUser);
          this.registerForm.controls.nameUser.setValue(dataUser!.nameUser);
          this.registerForm.controls.emailUser.setValue(dataUser!.emailUser);
          this.registerForm.controls.userRol.setValue(dataUser!.userRol);
        }else{
          this.registerForm.reset();
          this.userId = 0;
          this.user = undefined;
        }
      }
    });


    this._loginService.userLoginOn.subscribe({
      next: (userLoginOn)=>{
        this.userLoginOn= userLoginOn;
      }
    });
  }


  get nameUser(){
    return this.registerForm.controls.nameUser;
  }


  savePersonalDetailsData(){
    if(this.registerForm.valid){
      this._userService.updateUser(this.userId, this.registerForm.value as unknown as IUser).subscribe({
        next:() => {
          this.editMode = false;
          this.user = this.registerForm.value as unknown as IUser;
          this._loginService.updateCurrentUser(this.user);
        },
        error:(errorData) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorData
          });
        },
        complete: ()=>{
          Swal.fire({
            icon: "success",
            title: "Usuario Actualizado!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
    }
  }

}
