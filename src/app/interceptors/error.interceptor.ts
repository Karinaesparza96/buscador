
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.statusText ===
            "Unknown Error") {
            this.notificationService.error('Houve um erro, tente novamente ou entre em contato')
          }
        }
        if (error.status === 404) {
          this.notificationService.error('Não foi encontrado nenhum livro com este termo')
        }
        if (error.status === 400) {
          this.notificationService.error('Houve uma falha na consulta, tente novamente')
        }

        return throwError(() => error)
      })
    );
  }
} 