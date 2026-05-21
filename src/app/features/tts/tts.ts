import { CommonModule } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TtsService } from '../../core/services/tts.service';

@Component({
  selector: 'app-tts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tts.html',
})
export class Tts implements OnDestroy {
  private readonly ttsService = inject(TtsService);

  readonly voces = [
    { id: 'alloy', label: 'Alloy (neutra)' },
    { id: 'nova', label: 'Nova (femenina)' },
    { id: 'echo', label: 'Echo (masculina)' },
    { id: 'fable', label: 'Fable (británica)' },
  ];

  texto = '';
  voz = 'alloy';

  audioUrl: string | null = null;
  loading = false;
  error: string | null = null;

  get formValido(): boolean {
    return this.texto.trim().length > 0 && this.texto.length <= 300;
  }

  convertir(): void {
    if (!this.formValido) return;
    this.loading = true;
    this.error = null;
    this.liberarUrlAnterior();

    this.ttsService.textoAAudio({ text: this.texto.trim(), voice: this.voz }).subscribe({
      next: (blob) => {
        // createObjectURL genera una URL local del tipo blob:http://localhost...
        this.audioUrl = URL.createObjectURL(blob);
        this.loading = false;
      },
      error: (err: Error) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }

  private liberarUrlAnterior(): void {
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
      this.audioUrl = null;
    }
  }

  ngOnDestroy(): void {
    this.liberarUrlAnterior();
  }
}
