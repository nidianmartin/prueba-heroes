import { ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideNzIcons } from './icons-provider';
import { errorHandlerInterceptor } from '../shared/interceptors/error-handler.interceptor';

registerLocaleData(es);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([errorHandlerInterceptor])),
    provideNzIcons(),
  ],
};
