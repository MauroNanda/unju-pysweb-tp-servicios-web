import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Pelicula } from '../../core/models/pelicula.model';
import { PeliculasService } from '../../core/services/peliculas.service';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './peliculas.html',
})
export class Peliculas implements OnInit {
  private readonly peliculasService = inject(PeliculasService);

  peliculas: Pelicula[] = [];
  searchTerm = '';
  sortBy = 'rank';
  loading = false;
  error: string | null = null;

  get filteredPeliculas(): Pelicula[] {
    let result = this.peliculas;
    
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(term) || p.year?.toString().includes(term)
      );
    }
    
    return result.slice().sort((a, b) => {
      switch (this.sortBy) {
        case 'yearDesc':
          return b.year - a.year;
        case 'yearAsc':
          return a.year - b.year;
        case 'titleAsc':
          return a.title.localeCompare(b.title);
        case 'titleDesc':
          return b.title.localeCompare(a.title);
        case 'rank':
        default:
          return a.rank - b.rank;
      }
    });
  }

  private readonly badgeColors = [
    'bg-primary',
    'bg-success',
    'bg-danger',
    'bg-warning text-dark',
    'bg-info text-dark',
    'bg-secondary',
  ];

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.error = null;
    this.peliculasService.getTop100().subscribe({
      next: (data) => {
        this.peliculas = data;
        this.loading = false;
      },
      error: (err: Error) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }

  truncar(texto: string, max = 120): string {
    return texto.length > max ? `${texto.slice(0, max)}…` : texto;
  }

  colorBadge(genero: string): string {
    const idx = [...genero].reduce((acc, c) => acc + c.charCodeAt(0), 0) % this.badgeColors.length;
    return this.badgeColors[idx];
  }

  scrollToGrid(): void {
    document.getElementById('grid-peliculas')?.scrollIntoView({ behavior: 'smooth' });
  }

  handleImageError(event: Event, title: string): void {
    const img = event.target as HTMLImageElement;
    if (!img.src.includes('ui-avatars')) {
      img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=random&color=fff&size=512`;
    }
  }
}
