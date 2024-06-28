import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

export const JwtInterceptorService: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const _loginService = inject(LoginService);
  let token: String = _loginService.userToken;
  if (token != "") {
    // Verificar si la solicitud ya tiene el encabezado 'Content-Type' configurado como 'multipart/form-data'
    const isMultipart = request.headers.has('Content-Type') && request.headers.get('Content-Type') === 'multipart/form-data';

    // Clonamos la solicitud para añadir los encabezados necesarios
    let clonedRequest = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Si no es multipart/form-data, agregamos el encabezado 'Accept'
    if (!isMultipart) {
      clonedRequest = clonedRequest.clone({
        setHeaders: {
          'Accept': 'application/json'
        }
      });
      return next(clonedRequest);
    }
  }
  return next(request);
}
