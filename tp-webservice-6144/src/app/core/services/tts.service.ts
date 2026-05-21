import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface TtsRequest {
  text: string;
  voice: string; // ej: 'alloy', 'nova', 'echo'
}

@Injectable({ providedIn: 'root' })
export class TtsService {
  private readonly http = inject(HttpClient);

  private readonly host = environment.rapidApiHosts.tts;
  private readonly headers = new HttpHeaders({
    'X-RapidAPI-Key': environment.rapidApiKey,
    'X-RapidAPI-Host': this.host,
    'Content-Type': 'application/json',
  });

  /**
   * Devuelve el audio como Blob para poder usarlo con createObjectURL.
   * responseType: 'blob' es CLAVE — sin esto Angular intenta parsear como JSON y rompe.
   */
  textoAAudio(req: TtsRequest): Observable<Blob> {
    const payload = {
      model: 'tts-1',
      input: req.text,
      instructions: 'Speak clearly and naturally.',
      voice: req.voice,
    };

    return this.http
      .post(`https://${this.host}/`, payload, {
        headers: this.headers,
        responseType: 'blob',
      })
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(`TTS falló: ${err.status} ${err.statusText}`));
  }
}
