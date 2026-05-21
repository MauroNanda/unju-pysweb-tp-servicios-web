import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { QrService } from '../../core/services/qr.service';

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qr.html',
})
export class Qr {
  private readonly qrService = inject(QrService);

  texto = 'https://angular.dev';
  size = 300;
  ecc: 'L' | 'M' | 'Q' | 'H' = 'M';

  qrUrl: string | null = null;

  generar(): void {
    if (!this.texto.trim()) return;
    this.qrUrl = this.qrService.buildUrl({
      data: this.texto.trim(),
      size: this.size,
      ecc: this.ecc,
    });
  }

  descargar(): void {
    if (!this.qrUrl) return;
    const a = document.createElement('a');
    a.href = this.qrUrl;
    a.download = `qr-${Date.now()}.png`;
    a.click();
  }
}
