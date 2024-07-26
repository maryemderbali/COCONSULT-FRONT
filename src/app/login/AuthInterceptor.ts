import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
     const token = this.authService.getAuthToken();
     console.log('token is'+token)
   if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `access ${token}`,
        },
      });
    }
   return next.handle(request).pipe(
       catchError((err) => {
         if (err instanceof HttpErrorResponse) {
             if (err.status === 401) {
             // redirect user to the logout page
          }
       }
       return throwError(err);
     })
    )
   }
}
