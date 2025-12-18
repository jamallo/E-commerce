import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app'
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './app/core/interceptors/jwt.interceptor';


bootstrapApplication(App, {
  providers: [
    provideHttpClient(withInterceptors([JwtInterceptor])),
  ]
});
