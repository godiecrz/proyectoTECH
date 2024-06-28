import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IComments } from '../../models/coment.models';
import { environment } from '../../../environments/environment.development';
import { CommentUpdateService } from './comment.update.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private _httpClient = inject(HttpClient);
  private _commentUpdateService = inject(CommentUpdateService);

  constructor() { }

  getComments(idArticle: number): Observable<IComments[]>{
    return this._httpClient.get<IComments[]>(environment.urlHost+"comments/findArticle/"+idArticle);
  }


  saveComments(commentRequest: IComments): Observable<IComments[]>{
    return this._httpClient.post<IComments[]>(environment.urlHost+"comments/save", commentRequest).pipe(
      tap(() => this._commentUpdateService.notifyCommentCreated())
    );
  }

  deleteComment(idComment: number): Observable<any>{
    return this._httpClient.delete<any>(environment.urlHost+"comments/delete/"+idComment).pipe(
      tap(() => this._commentUpdateService.notifyCommentCreated())
    );
  }
}
