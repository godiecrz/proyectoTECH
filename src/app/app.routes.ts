import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './security/auth.guard';
import { ArticlesComponent } from './pages/articles/articles.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    //{ path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'home', component: HomeComponent},
    { path: 'articles', component: ArticlesComponent},
    { path: 'not-found', component: NotFoundComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Ruta por defecto apunta al login 
    { path: '**', component: NotFoundComponent } //cuando la ruta no coincida con alguna de las parametrizadas en este arreglo
];
