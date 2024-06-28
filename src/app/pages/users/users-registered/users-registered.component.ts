import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { IUser } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../../../services/role/role.service';
import { IRole } from '../../../models/roles.models';
import { UserUpdateService } from '../../../services/user/user.update.service';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/auth/login.service';

@Component({
  selector: 'app-users-registered',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users-registered.component.html',
  styleUrl: './users-registered.component.css'
})
export class UsersRegisteredComponent {

  private _userService = inject(UserService);
  private _roleService = inject(RoleService);
  private _userUpdateService = inject(UserUpdateService);
  private _loginService = inject(LoginService);

  users?: IUser[];
  roles?: IRole[];
  selectedUser?: IUser | null = null;
  loading: boolean = false;
  loading2: boolean = false;
  currentIdUser?: number;

  constructor() {
    this.fetchRoles();
    this._userUpdateService.userUpdate.subscribe(() => {
      this.fetchUsers();
    });
  }

  fetchUsers() {
    this._userService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
        this.descriptionRole();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  descriptionRole() {
    this.users?.forEach((us) => {
      const desRol = this.roles?.find(rol => rol.idRole == us.userRol);
      us.descriptionRole = desRol!.descriptionRole;
    });
  }

  fetchRoles() {
    this._roleService.getRoles().subscribe({
      next: (response) => {
        this.roles = response;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.infoUserCurrent();
        this.fetchUsers();
      }
    });
  }


  editUser(user: IUser) {
    this.selectedUser = { ...user }; // Clona el registro para evitar modificar el original
  }

  deleteUser(iduser: number) {
    this.loading = true;
    this._userService.deleteUser(iduser).subscribe({
      next: (response) => {
      },
      error: (error) => {
        this.loading = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error
        });
      },
      complete: () => {
        this.loading = false;
        Swal.fire({
          icon: "success",
          title: "Usuario Eliminado!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.selectedUser) {
      this._userService.updateUser(this.selectedUser.idUser, this.selectedUser).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          this.loading = false;
          this.cancelEdit();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error
          });
        },
        complete: () => {
          this.loading = false;
          this.cancelEdit();
          Swal.fire({
            icon: "success",
            title: "Usuario Modificado!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    } else {
      this.loading = false;
    }

  }

  cancelEdit() {
    this.selectedUser = null;
  }


  infoUserCurrent() {
    this._loginService.dataUserLogin.subscribe({
      next: (dataUser) => {
        this.currentIdUser = dataUser?.idUser;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


}
