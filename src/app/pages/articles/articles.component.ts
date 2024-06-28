import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [ CommonModule, HeaderComponent, NavbarComponent, ArticlePreviewComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {

}
