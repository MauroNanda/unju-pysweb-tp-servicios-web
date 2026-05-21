import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

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

  private readonly cacheModelos = new Map<string, Modelo[]>();
  private cacheMarcas: Marca[] | null = null;

  getMarcas(): Observable<Marca[]> {
    if (this.cacheMarcas) {
      return of(this.cacheMarcas);
    }
    return this.http.get<Marca[]>(`https://${this.host}/v2/cars/makes`, { headers: this.headers }).pipe(
      map((marcas) =>
        marcas.map((m) => ({
          ...m,
          logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=random&color=fff&size=200`,
        }))
      ),
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
      .get<Modelo[]>(`https://${this.host}/v2/cars/makes/${brandId}/models`, { headers: this.headers })
      .pipe(
        tap((data) => this.cacheModelos.set(brandId, data)),
        catchError((err: HttpErrorResponse) => this.handleError(err)),
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(`Error API autos: ${err.status} ${err.statusText}`));
  }
}
