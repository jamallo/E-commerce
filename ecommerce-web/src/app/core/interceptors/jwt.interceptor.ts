import { inject } from "@angular/core";
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
import { captureError } from "rxjs/internal/util/errorContext";
import { catchError, throwError } from "rxjs";

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isTokenExpired()) {
    authService.logout();
    router.navigate(['/login']);
    return throwError(() => new Error('Token expirado'));
  }

  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError(error => {
      
      //Backend devuelve 401 o 403
      if (error.status === 401 || error.status === 403) {
        authService.logout();
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );

};
