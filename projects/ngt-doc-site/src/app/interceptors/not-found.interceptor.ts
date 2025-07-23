/* 3rd party libraries */
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';
import { inject } from '@angular/core';

/* locally accessible feature module code, always use a relative path */
import { AppService } from '../app.service';

export const notFoundInterceptor: HttpInterceptorFn = (req, next) => {

  const appService = inject(AppService);

  return next(req)
    .pipe(
      tap({
        error: err => {
          if (err instanceof HttpErrorResponse && err.status === 404) {
            appService.setPage('404');
          }
          next( err );
        }
      })
    );
};
