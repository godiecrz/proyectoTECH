import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleUpdateService {

  private articleCreatedSource = new Subject<void>();

  constructor() { }

  articleCreated = this.articleCreatedSource.asObservable();

  notifyArticleCreated() {
    this.articleCreatedSource.next();
  }
}
