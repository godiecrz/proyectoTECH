import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../../services/article/article.service';
import { LoginService } from '../../../services/auth/login.service';
import { IArticle } from '../../../models/articles.models';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publish-article',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './publish-article.component.html',
  styleUrl: './publish-article.component.css'
})
export class PublishArticleComponent {

  private _formBuilder = inject(FormBuilder);
  private _articleService = inject(ArticleService);
  private _loginService = inject(LoginService);

  selectedFile: File | null = null;
  loading: boolean = false;

  registerArticle = this._formBuilder.group({
    titleArticle: ['', Validators.required],
    descShortArticle: ['', Validators.required],
    descLongArticle: ['', Validators.required],
    imageArticle: [null, Validators.required],
    userArticle: ['', Validators.required],
  });

  constructor() { }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    this.loading = true;
    this.infoUser();
    if (this.registerArticle.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('titleArticle', this.registerArticle.get('titleArticle')?.value!);
      formData.append('descShortArticle', this.registerArticle.get('descShortArticle')?.value!);
      formData.append('descLongArticle', this.registerArticle.get('descLongArticle')?.value!);
      formData.append('imageArticle', this.selectedFile);
      formData.append('userArticle', this.registerArticle.get('userArticle')?.value!);

      this._articleService.postArticle(formData).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          this.loading = false;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error
          });
        },
        complete: () => {
          console.log('Articulo registrado exitosamente');
          this.registerArticle.reset();
          this.loading = false;
          Swal.fire({
            icon: "success",
            title: "Artículo Publicado!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    } else {
      this.loading = false;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'Formulario inválido o archivo no seleccionado'
      });
    }
  }


  infoUser() {
    this._loginService.dataUserLogin.subscribe({
      next: (dataUser) => {
        this.registerArticle.controls.userArticle.setValue(dataUser!.idUser.toString());
      }
    });
  }
}
