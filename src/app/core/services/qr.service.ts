import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

export interface QrOptions {
  data: string;
  size: number; // 100–1000
  ecc: 'L' | 'M' | 'Q' | 'H'; // nivel de corrección de errores
}

@Injectable({ providedIn: 'root' })
export class QrService {
  /**
   * goqr.me responde directamente con la imagen PNG por GET.
   * No hace falta HttpClient — alcanza con armar la URL para el <img>.
   */
  buildUrl(opts: QrOptions): string {
    const params = new URLSearchParams({
      data: opts.data,
      size: `${opts.size}x${opts.size}`,
      ecc: opts.ecc,
    });
    return `${environment.qrApiBase}?${params.toString()}`;
  }
}
