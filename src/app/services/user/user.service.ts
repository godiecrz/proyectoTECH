import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IUser } from '../../models/user.model';
import { environment } from '../../../environments/environment.development';
import { UserUpdateService } from './user.update.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _httpClient = inject(HttpClient);
  private _userUpdateService = inject(UserUpdateService);

  constructor() { }

  getUser(id: number): Observable<IUser>{
    return this._httpClient.get<IUser>(environment.urlHost+"users/find/"+id);
  }


  updateUser(id:number, userRequest: IUser): Observable<any>{
    return this._httpClient.put(environment.urlHost+"users/update/"+id, userRequest).pipe(
      tap(() => this._userUpdateService.notifyUserUpdate())
    );
  }

  deleteUser(idUser: number): Observable<any>{
    return this._httpClient.delete<any>(environment.urlHost+"users/delete/"+idUser);
  }

  saveUser(userRequest: IUser): Observable<any>{
    return this._httpClient.post(environment.urlHost+"auth/save", userRequest);
  }

  getUsers(): Observable<IUser[]>{
    return this._httpClient.get<IUser[]>(environment.urlHost+"users/all");
  }

}
