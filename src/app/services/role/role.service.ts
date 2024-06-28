import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IRole } from '../../models/roles.models';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private _httpClient = inject(HttpClient);

  constructor() { }

  getRoles(): Observable<IRole[]>{
    return this._httpClient.get<IRole[]>(environment.urlHost+"roles/all");
  }
}
