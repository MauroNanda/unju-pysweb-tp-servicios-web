import { Injectable, signal } from '@angular/core';

export interface Toast {
  message: string;
  type: 'success' | 'danger' | 'warning' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<Toast[]>([]);

  show(message: string, type: Toast['type'] = 'danger') {
    const newToast = { message, type };
    this.toasts.update(t => [...t, newToast]);
    setTimeout(() => this.remove(newToast), 5000);
  }

  remove(toast: Toast) {
    this.toasts.update(t => t.filter(x => x !== toast));
  }
}
