import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _http = inject(HttpClient);
  private urlBase: string = 'http://localhost:8080/';

  token = '';
  name = "godiecrzz@hotmail.com";
  clave='123';

  constructor() { }

  getUsers(): Observable<IUser[]>{
    return this._http.get<IUser[]>(this.urlBase + 'users/all');
  }


  isAuth(){
    return this.token.length > 0;
  }
}
