import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SuccessNotificationInterceptorService implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse && event.status === 200) {
          console.log('Successfully');
        } else if (event instanceof HttpResponse && event.status === 201) {
          this.snackBar.open("Successfully create hero", 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2000,
          });
        }
      })
    );
  }
}
