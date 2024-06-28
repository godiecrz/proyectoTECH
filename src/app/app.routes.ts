import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/users/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './security/auth.guard';
import { ArticlesComponent } from './pages/articles/articles.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RegisterComponent } from './pages/users/register/register.component';
import { AccountSettingsComponent } from './pages/users/account-settings/account-settings.component';

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    //{ path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'home', component: HomeComponent},
    { path: 'my_account', component: AccountSettingsComponent},
    { path: 'articles', component: ArticlesComponent},
    { path: 'not-found', component: NotFoundComponent },
    //{ path: '', redirectTo: 'login', pathMatch: 'full' }, // Ruta por defecto apunta al login
    //{ path: '**', component: NotFoundComponent } //cuando la ruta no coincida con alguna de las parametrizadas en este arreglo
    { path: 'dashboard', component: DashboardComponent},
    { path: 'iniciar-sesion', component: LoginComponent},
    { path: '', redirectTo: '/inicio', pathMatch: 'full' }
];
