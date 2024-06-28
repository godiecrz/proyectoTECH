import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ArticleService } from '../../../services/article/article.service';
import { IArticle } from '../../../models/articles.models';
import { UserService } from '../../../services/user/user.service';
import { ArticleUpdateService } from '../../../services/article/article.update.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-published',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './article-published.component.html',
  styleUrl: './article-published.component.css'
})
export class ArticlePublishedComponent {

  private _articleService = inject(ArticleService);
  private _userService = inject(UserService);
  private _articleUpdateService = inject(ArticleUpdateService);

  public errorMessage!: String;
  articles?: IArticle[];
  selectedArticle: IArticle | null = null;
  selectedFile: File | null = null;

  constructor() {
    this.fetchArticles();
    this._articleUpdateService.articleCreated.subscribe(() => {
      this.fetchArticles();
    });
  }

  fetchArticles() {
    this._articleService.getArticles().subscribe({
      next: (data: IArticle[]) => {
        this.articles = data;
        this.loadNameUser();
      },
      error: (errorData) => {
        console.error(errorData);
      },
      complete: () => {
        console.log('Carga de artículos completa');
      }
    })
  }

  loadNameUser() {
    this.articles?.forEach(art => {
      this._userService.getUser(art.articuloUsuario).subscribe({
        next: (userData) => {
          art.articuloEmailUsuario = userData.emailUser;
        },
        error: (errorData) => {
          console.error(errorData);
        }
      })
    })
  }

  editArticle(article: IArticle) {
    this.selectedArticle = { ...article }; // Clona el registro para evitar modificar el original
  }

  cancelEdit() {
    this.selectedArticle = null;
  }

  onSubmit() {
    if (this.selectedArticle) {
      const formData = new FormData();
      formData.append('titleArticle', this.selectedArticle.tituloArticulo);
      formData.append('descShortArticle', this.selectedArticle.descripcionCortaArticulo);
      formData.append('descLongArticle', this.selectedArticle.descripcionLargaArticulo);
      if (this.selectedFile) {
        formData.append('imageArticle', this.selectedFile);
      }
      this._articleService.updateArticle(formData, this.selectedArticle.idArticulo).subscribe({
        next:(response)=>{
          console.log(response);
        },
        error:( error )=>{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error
          });
        },
        complete:()=>{
          this.cancelEdit();
          Swal.fire({
            icon: "success",
            title: "Artículo Actualizado!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  deleteArticle(idArticle: number) {
    this._articleService.deleteArticle(idArticle).subscribe({
      next:(response)=>{
        console.log(response);
      },
      error: ( error )=>{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error
        });
      },
      complete: ()=>{
        console.log('Articulo eliminado exitosamente');
        Swal.fire({
          icon: "success",
          title: "Artículo Eliminado!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

}
