import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Marca, Modelo } from '../models/auto.model';

@Injectable({ providedIn: 'root' })
export class AutosService {
  private readonly http = inject(HttpClient);

  private readonly host = environment.rapidApiHosts.autos;
  private readonly headers = new HttpHeaders({
    'X-RapidAPI-Key': environment.rapidApiKey,
    'X-RapidAPI-Host': this.host,
  });

  // Caché en memoria: clave = brandId, valor = modelos ya descargados
  private readonly cacheModelos = new Map<string, Modelo[]>();
  private cacheMarcas: Marca[] | null = null;

  getMarcas(): Observable<Marca[]> {
    if (this.cacheMarcas) {
      // Devolvemos el cache como Observable para no romper el contrato del consumer
      return of(this.cacheMarcas);
    }
    return this.http.get<Marca[]>(`https://${this.host}/brands`, { headers: this.headers }).pipe(
      tap((data) => (this.cacheMarcas = data)),
      catchError((err: HttpErrorResponse) => this.handleError(err)),
    );
  }

  getModelosByMarca(brandId: string): Observable<Modelo[]> {
    const cached = this.cacheModelos.get(brandId);
    if (cached) {
      return of(cached);
    }
    return this.http
      .get<Modelo[]>(`https://${this.host}/brands/${brandId}/models`, { headers: this.headers })
      .pipe(
        tap((data) => this.cacheModelos.set(brandId, data)),
        catchError((err: HttpErrorResponse) => this.handleError(err)),
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(`Error API autos: ${err.status} ${err.statusText}`));
  }
}
