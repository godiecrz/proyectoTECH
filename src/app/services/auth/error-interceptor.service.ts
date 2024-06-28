import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const ErrorInterceptorService: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    let errorMessage = "";
    console.log(error.error);

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message};`
    } else {
      switch (error.status) {
        // credenciales incorrectas
        case 401:
          errorMessage = error.error || `Error code: ${error.status}, message: ${error.message}`;
          break;

        // usuario existente o campos nulos hacia base de datos con campos obligatorios
        case 409:
          errorMessage = error.error || `Error code: ${error.status}, message: ${error.message}`;
          break;

        //
        case 502:
          errorMessage = error.error || `Error code: ${error.status}, message: ${error.message}`;
          break;

        default:
          errorMessage = `Error code: ${error.status}, message: ${error.message}`;
          break;
      }
    }
    return throwError(() => new Error(errorMessage));
  }))
};
