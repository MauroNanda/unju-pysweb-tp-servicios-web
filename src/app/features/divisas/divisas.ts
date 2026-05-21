import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DivisasService } from '../../core/services/divisas.service';

@Component({
  selector: 'app-divisas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './divisas.html',
})
export class Divisas {
  private readonly divisasService = inject(DivisasService);

  readonly monedas = ['USD', 'EUR', 'ARS', 'BRL', 'CLP', 'UYU', 'GBP', 'JPY', 'MXN'];

  cantidad = 1;
  origen = 'USD';
  destino = 'ARS';

  resultado: number | null = null;
  loading = false;
  error: string | null = null;

  get formValido(): boolean {
    return this.cantidad > 0 && this.cantidad <= 1000000000000 && !!this.origen && !!this.destino && this.origen !== this.destino;
  }

  convertir(): void {
    if (!this.formValido) return;
    this.loading = true;
    this.error = null;
    this.resultado = null;

    this.divisasService.convertir(this.origen, this.destino, this.cantidad).subscribe({
      next: (res) => {
        this.resultado = res.result;
        this.loading = false;
      },
      error: (err: Error) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }
}
