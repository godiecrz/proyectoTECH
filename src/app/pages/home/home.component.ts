import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { register } from 'swiper/element/bundle';
import { HeaderComponent } from '../../shared/header/header.component';

// register Swiper custom elements
register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, NavbarComponent, HeaderComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {



}
