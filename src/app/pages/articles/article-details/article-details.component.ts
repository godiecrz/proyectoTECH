import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { IArticle } from '../../../models/articles.models';
import { ArticleService } from '../../../services/article/article.service';
import { UserService } from '../../../services/user/user.service';
import { CommentComponent } from '../../comment/comment.component';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [ CommonModule, CommentComponent ],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css'
})
export class ArticleDetailsComponent implements OnInit{

  private _articleService = inject(ArticleService);
  private _userService = inject(UserService);
  loading: boolean = true

  @Input() articleSelected!: number;
  @Output() backToList  = new EventEmitter<void>();

  article?:IArticle;
  nameUser?:string;

  constructor(){
  }

  ngOnInit(): void {
    this.findArticle();
  }

  findArticle(){
    this._articleService.findArticle(this.articleSelected).subscribe({
      next: ( response ) =>{
        this.article = response;
      },
      error:( error ) =>{
        console.error(error);
        this.loading = false;
      },
      complete:() =>{
        this.loadNameUser(this.article!.articuloUsuario);
        this.loading = false;
      }
    })
  }

  backToArticles() {
    this.backToList.emit();
    this.article = undefined;
  }

  loadNameUser(idUser: number){
    this._userService.getUser(idUser).subscribe({
      next:( response )=>{
        this.nameUser = response.nameUser;
      },
      error:( error )=>{
        console.error(error);
      }
    });
  }

}
