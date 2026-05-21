import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { ToastService } from '../services/toast.service';

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocurrió un error inesperado.';

      if (error.status === 429) {
        errorMessage = 'Límite de API alcanzado. Por favor, intenta de nuevo más tarde.';
      } else if (error.status === 403) {
        errorMessage = 'Acceso denegado (403). Verifica tus permisos de API.';
      } else if (error.status === 0) {
        errorMessage = 'No se pudo conectar al servidor. Revisa tu conexión a internet.';
      } else {
        errorMessage = error.message || `Error ${error.status}`;
      }

      toastService.show(errorMessage, 'danger');
      return throwError(() => error);
    })
  );
};
