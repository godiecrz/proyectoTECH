import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

export const authGuard: CanActivateFn = (route, state) => {

  const _service = inject(ApiService);
  const _router = inject(Router);

  if(_service.isAuth()){
    return true;
  }else{
    _router.navigate(['/login']);
    return false;
  }
  
};
