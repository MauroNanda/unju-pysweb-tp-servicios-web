import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

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

  private cacheTop100: Pelicula[] | null = null;

  getTop100(): Observable<Pelicula[]> {
    if (this.cacheTop100) {
      return of(this.cacheTop100);
    }
    return this.http
      .get<Pelicula[]>(this.url, { headers: this.headers })
      .pipe(
        tap((data) => (this.cacheTop100 = data)),
        catchError((err: HttpErrorResponse) => this.handleError(err)),
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const msg =
      err.status === 0
        ? 'No se pudo contactar al servidor. Revisá tu conexión.'
        : `Error ${err.status}: ${err.statusText || 'desconocido'}`;
    return throwError(() => new Error(msg));
  }
}
