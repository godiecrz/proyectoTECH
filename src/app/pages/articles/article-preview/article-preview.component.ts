import { Component, OnInit, inject } from '@angular/core';
import { ArticleService } from '../../../services/article/article.service';
import { IArticle } from '../../../models/articles.models';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { ArticleDetailsComponent } from '../article-details/article-details.component';

@Component({
  selector: 'app-article-preview',
  standalone: true,
  imports: [CommonModule, ErrorMessageComponent, ArticleDetailsComponent],
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.css'
})
export class ArticlePreviewComponent implements OnInit {

  private _articleService = inject(ArticleService);
  public errorMessage!: string;
  loading: boolean = true

  articles?: IArticle[];
  articleSelected?: number;

  ngOnInit(): void {
    this.fetchArticulos();
  }

  fetchArticulos() {
    this._articleService.getArticles().subscribe({
      next: (data: IArticle[]) => {
        this.articles = data;
      },
      error: (errorData) => {
        console.error(errorData);// aqui queda el error que devuelve el interceptor-error
        this.errorMessage = errorData;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  verArticulo(idArticulo: number) {
    //const auxArt = this.articles?.find(art => art.idArticulo === idArticulo); //buscar articulo en array
    this.articleSelected = idArticulo;
  }

  backToList() {
    this.articleSelected = undefined;
  }
}
