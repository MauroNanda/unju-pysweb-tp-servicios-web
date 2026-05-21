import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ConversionResponse } from '../models/divisas.model';

@Injectable({ providedIn: 'root' })
export class DivisasService {
  private readonly http = inject(HttpClient);

  private readonly headers = new HttpHeaders({
    apikey: environment.apiLayerKey,
  });

  convertir(from: string, to: string, amount: number): Observable<ConversionResponse> {
    const params = new HttpParams().set('from', from).set('to', to).set('amount', amount);
    return this.http
      .get<ConversionResponse>(`${environment.apiLayerBase}/convert`, {
        headers: this.headers,
        params,
      })
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(`No se pudo convertir: ${err.status} ${err.statusText}`));
  }
}
