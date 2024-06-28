import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IComments } from '../../models/coment.models';
import { CommentService } from '../../services/comment/comment.service';
import { LoginService } from '../../services/auth/login.service';
import Swal from 'sweetalert2';
import { CommentUpdateService } from '../../services/comment/comment.update.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {

  private _formBuilder = inject(FormBuilder);
  private _commentService = inject(CommentService);
  private _loginService = inject(LoginService);
  private _userService = inject(UserService);
  private _commentUpdateService = inject(CommentUpdateService);

  @Input() articleId?: number;
  comments?: IComments[];
  currentIdUser?: number;
  isAdmin: boolean = false;
  loading: boolean = false;
  loading2: boolean = false;

  commentForm = this._formBuilder.group({
    descriptionComment: ['', Validators.required],
    commentUser: [0],
    commentArticle: [0]
  });

  constructor() {
    this.infoUserCurrent();
    this.isAdmin = this._loginService.isAdmin;
    this._commentUpdateService.commentPublished.subscribe({
      next: () => {
        this.fetchComments();
      }
    });
  }

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments() {
    this.loading = true;
    this._commentService.getComments(this.articleId!).subscribe({
      next: (response) => {
        this.comments = response;
        this.infoUserComment();
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
      },
      complete: () => {
        console.log('Carga de comentarios completa');
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.loading2 = true;
    if (this.commentForm.valid) {
      this.commentForm.controls.commentArticle.setValue(this.articleId!);
      this._commentService.saveComments(this.commentForm.value as IComments).subscribe({
        next: (response) => {
          this.commentForm.reset();
        },
        error: (error) => {
          this.loading2 = false;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error
          });
        },
        complete: () => {
          this.loading2 = false;
          Swal.fire({
            icon: "success",
            title: "Comentario Publicado!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }else{
      this.loading2 = false;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'Completa todos los campos'
      });
    }
  }

  infoUserCurrent() {
    this._loginService.dataUserLogin.subscribe({
      next: (dataUser) => {
        this.commentForm.controls.commentUser.setValue(dataUser!.idUser);
        this.currentIdUser = dataUser?.idUser;
      }
    });
  }


  infoUserComment(){
    this.comments?.forEach((com)=>{
      this._userService.getUser(com.commentUser).subscribe({
        next:( response )=>{
          com.nameUserComment = response.nameUser;
          if(com.commentUser == this.currentIdUser){
            com.authorComment = true;
          }else{
            com.authorComment = false;
          }
        },
        error: ( error )=>{
          console.error(error);
        }
      });
    })
  }


  deleteComment(idComment: number){
    this._commentService.deleteComment(idComment).subscribe({
      next: ( response )=>{
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
        Swal.fire({
          icon: "success",
          title: "Comentario Eliminado!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });

  }
}
