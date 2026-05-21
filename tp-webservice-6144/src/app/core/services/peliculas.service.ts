import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Pelicula } from '../models/pelicula.model';

@Injectable({ providedIn: 'root' })
export class PeliculasService {
  private readonly http = inject(HttpClient);

  private readonly url = `https://${environment.rapidApiHosts.peliculas}/`;
  private readonly headers = new HttpHeaders({
    'X-RapidAPI-Key': environment.rapidApiKey,
    'X-RapidAPI-Host': environment.rapidApiHosts.peliculas,
  });

  getTop100(): Observable<Pelicula[]> {
    return this.http
      .get<Pelicula[]>(this.url, { headers: this.headers })
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const msg =
      err.status === 0
        ? 'No se pudo contactar al servidor. Revisá tu conexión.'
        : `Error ${err.status}: ${err.statusText || 'desconocido'}`;
    return throwError(() => new Error(msg));
  }
}
