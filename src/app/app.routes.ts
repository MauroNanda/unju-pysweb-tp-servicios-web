import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'peliculas' },

  {
    path: 'peliculas',
    loadComponent: () => import('./features/peliculas/peliculas').then((m) => m.Peliculas),
    title: 'TP · Películas',
  },
  {
    path: 'vehiculos',
    loadComponent: () => import('./features/autos/autos').then((m) => m.Autos),
    title: 'TP · Vehículos',
  },
  {
    path: 'divisas',
    loadComponent: () => import('./features/divisas/divisas').then((m) => m.Divisas),
    title: 'TP · Divisas',
  },
  {
    path: 'tts',
    loadComponent: () => import('./features/tts/tts').then((m) => m.Tts),
    title: 'TP · Text-to-Speech',
  },
  {
    path: 'qr',
    loadComponent: () => import('./features/qr/qr').then((m) => m.Qr),
    title: 'TP · QR',
  },
];
