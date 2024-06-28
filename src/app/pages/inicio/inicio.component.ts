import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';

// register Swiper custom elements
register();

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
