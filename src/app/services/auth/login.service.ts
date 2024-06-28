import { Injectable, inject } from '@angular/core';
import { ILoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _httpClinet = inject(HttpClient);

  user!: IUser;
  isAdmin: boolean = false;

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");
  currentUser: BehaviorSubject<IUser | null>;

  constructor() {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
    this.currentUser = new BehaviorSubject<IUser | null>(JSON.parse(sessionStorage.getItem('user')!));
    this.rolUser();
   }

  login(credentials: ILoginRequest): Observable<any>{
    return this._httpClinet.post<any>(environment.urlHost+"auth/login",credentials).pipe(
      tap((userData) =>{
        this.user = userData.user;
        sessionStorage.setItem("token", userData.token)
        sessionStorage.setItem('user', JSON.stringify(userData.user));
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
        this.currentUser.next(userData.user);
        this.rolUser();
      })
    );
  }


  logout(): void{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    this.currentUserLoginOn.next(false);
    this.currentUserData.next("");
    this.currentUser.next(null);
    this.isAdmin = false;
  }

  updateCurrentUser(user: IUser){
    sessionStorage.setItem('user', JSON.stringify(user));
    this.currentUser.next(user);
  }


  rolUser(){
    this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.isAdmin = this.user && this.user.userRol === 1;
  }


  get userData(): Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get dataUserLogin(): Observable<IUser | null>{
    return this.currentUser.asObservable();
  }

  get userToken(): String{
    return this.currentUserData.value;
  }


}
