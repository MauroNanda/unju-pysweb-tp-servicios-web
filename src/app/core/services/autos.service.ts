import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Generation, Marca, Modelo, Trim, TrimSpecs } from '../models/auto.model';

@Injectable({ providedIn: 'root' })
export class AutosService {
  private readonly http = inject(HttpClient);

  private readonly host = environment.rapidApiHosts.autos;
  private readonly headers = new HttpHeaders({
    'X-RapidAPI-Key': environment.rapidApiKey,
    'X-RapidAPI-Host': this.host,
  });

  private readonly cacheModelos = new Map<string, Modelo[]>();
  private readonly cacheGenerations = new Map<string, Generation[]>();
  private readonly cacheTrims = new Map<string, Trim[]>();
  private readonly cacheSpecs = new Map<number, TrimSpecs>();
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

  getGenerationsByModel(modelId: string): Observable<Generation[]> {
    const cached = this.cacheGenerations.get(modelId);
    if (cached) return of(cached);
    return this.http
      .get<Generation[]>(`https://${this.host}/v2/cars/models/${modelId}/generations`, { headers: this.headers })
      .pipe(
        tap((data) => this.cacheGenerations.set(modelId, data)),
        catchError((err: HttpErrorResponse) => this.handleError(err)),
      );
  }

  getTrimsByGeneration(genId: string): Observable<Trim[]> {
    const cached = this.cacheTrims.get(genId);
    if (cached) return of(cached);
    return this.http
      .get<Trim[]>(`https://${this.host}/v2/cars/generations/${genId}/trims`, { headers: this.headers })
      .pipe(
        tap((data) => this.cacheTrims.set(genId, data)),
        catchError((err: HttpErrorResponse) => this.handleError(err)),
      );
  }

  getSpecsByTrim(trimId: number): Observable<TrimSpecs> {
    const cached = this.cacheSpecs.get(trimId);
    if (cached) return of(cached);
    return this.http
      .get<TrimSpecs>(`https://${this.host}/v2/cars/trims/${trimId}`, { headers: this.headers })
      .pipe(
        tap((data) => this.cacheSpecs.set(trimId, data)),
        catchError((err: HttpErrorResponse) => this.handleError(err)),
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(`Error API autos: ${err.status} ${err.statusText}`));
  }
}
