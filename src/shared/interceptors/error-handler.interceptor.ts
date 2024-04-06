import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.snackBar.open(`Error: ${error.error.message}`, 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2000,
          });
        } else {
          this.snackBar.open(
            `Error code: ${error.status}, message: ${error.message}`,
            'Close',
            {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 2000,
            }
          );
        }
        return throwError(() => console.log(error.message, 'MyErrpr'));
      })
    );
  }
}
