import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IArticle } from '../../models/articles.models';
import { environment } from '../../../environments/environment.development';
import { ArticleUpdateService } from './article.update.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private _httpClient = inject(HttpClient);
  private _articleUpdateService = inject(ArticleUpdateService);

  constructor() { }

  getArticles(): Observable<IArticle[]>{
    return this._httpClient.get<IArticle[]>(environment.urlHost+"articles/all");
  }

  findArticle(idArticle: number): Observable<any>{
    return this._httpClient.get(environment.urlHost+'articles/find/'+idArticle);
  }

  postArticle(articleRequest: FormData): Observable<any>{
    return this._httpClient.post(environment.urlHost+'articles/save', articleRequest).pipe(
      tap(() => this._articleUpdateService.notifyArticleCreated())
    );
  }

  updateArticle(articleRequest: FormData, idArticle: number): Observable<any>{
    return this._httpClient.put(environment.urlHost+'articles/update/'+idArticle, articleRequest).pipe(
      tap(() => this._articleUpdateService.notifyArticleCreated())
    );
  }

  deleteArticle(idArticle: number): Observable<any>{
    return this._httpClient.delete(environment.urlHost+'articles/delete/'+idArticle).pipe(
      tap(() => this._articleUpdateService.notifyArticleCreated())
    );
  }
}
