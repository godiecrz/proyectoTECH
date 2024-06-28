import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  private _loginService = inject(LoginService);
  private _router = inject(Router);


  menuOption: string='';
  userLoginOn: Boolean = false;
  isAdmin: boolean = false;

  user:IUser = {
    idUser: 0,
    nameUser: 'Invitado',
    emailUser: '',
    userRol: 0
  };


  ngOnInit(): void {
    this._loginService.userLoginOn.subscribe({
      next:(userLoginOn) =>{
        this.userLoginOn = userLoginOn;
        this.isAdmin = this._loginService.isAdmin;
        if(userLoginOn == true){
          this.infoUser();
        }
      }
    })
  }

  infoUser(){
    this._loginService.dataUserLogin.subscribe({
      next:(dataUser)=>{
        if(dataUser){
          this.user = dataUser!;
        }
      }
    });
  }

  logout(){
    this._router.navigate(['']);
    this._loginService.logout();
  }

  onOption(opcion: string){
    this.menuOption = opcion;
  }


}
