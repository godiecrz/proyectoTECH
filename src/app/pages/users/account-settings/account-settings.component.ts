import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { PersonalDetailsComponent } from '../../../components/personal-details/personal-details.component';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [ CommonModule, NavbarComponent, HeaderComponent, PersonalDetailsComponent],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent {

}
