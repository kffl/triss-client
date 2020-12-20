import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {SecurityService} from './SecurityService';

export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private securityService: SecurityService) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {

          if (error.status === 0 || error.status === 401) {
            this.securityService.redirectToELogin();
          }
          return throwError(error);
        })
      );
  }
}
