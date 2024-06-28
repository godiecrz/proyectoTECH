import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/auth/login.service';
import { PersonalDetailsComponent } from '../../components/personal-details/personal-details.component';
import { IUser } from '../../models/user.model';
import { ArticlePublishedComponent } from '../articles/article-published/article-published.component';
import { PublishArticleComponent } from '../articles/publish-article/publish-article.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { UsersRegisteredComponent } from '../users/users-registered/users-registered.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule, HeaderComponent, NavbarComponent, UsersRegisteredComponent,
    PersonalDetailsComponent , ArticlePublishedComponent, PublishArticleComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  private _loginService = inject(LoginService);

  userLoginOn: Boolean = false;

  ngOnInit(): void {
    this._loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) =>{
        this.userLoginOn = userLoginOn;
      }
    });
  }

}
