import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { ErrorHandlerInterceptor } from '../shared/interceptors/error-handler.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SuccessNotificationInterceptorService } from '../shared/interceptors/sucess.interceptor';

registerLocaleData(es);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(FormsModule),
    provideHttpClient(), provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SuccessNotificationInterceptorService, multi: true }
  ],
};
