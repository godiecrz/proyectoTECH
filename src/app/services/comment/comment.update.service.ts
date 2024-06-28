import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentUpdateService {

  private commentPublishedSource = new Subject<void>();

  constructor() { }

  commentPublished = this.commentPublishedSource.asObservable();

  notifyCommentCreated() {
    this.commentPublishedSource.next();
  }

}
