import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent {
  private _loginService = inject(LoginService);
  @Input() errorMessage!: string;

  login(){
    this._loginService.logout();
  }
}
