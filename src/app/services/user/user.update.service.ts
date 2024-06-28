import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserUpdateService {

  private userUpdateSource = new Subject<void>();

  constructor() { }

  userUpdate = this.userUpdateSource.asObservable();

  notifyUserUpdate() {
    this.userUpdateSource.next();
  }

}
