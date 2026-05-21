import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Marca, Modelo } from '../../core/models/auto.model';
import { AutosService } from '../../core/services/autos.service';

@Component({
  selector: 'app-autos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './autos.html',
})
export class Autos implements OnInit, AfterViewInit {
  private readonly autosService = inject(AutosService);

  marcas: Marca[] = [];
  modelos: Modelo[] = [];
  marcaSeleccionada: Marca | null = null;
  searchTerm = '';

  get filteredMarcas(): Marca[] {
    if (!this.searchTerm.trim()) {
      return this.marcas;
    }
    const term = this.searchTerm.toLowerCase();
    return this.marcas.filter((m) => m.name.toLowerCase().includes(term));
  }

  loadingMarcas = false;
  loadingModelos = false;
  error: string | null = null;

  private modal: any;

  ngOnInit(): void {
    this.cargarMarcas();
  }

  ngAfterViewInit(): void {
    const bs = (window as any)['bootstrap'];
    const el = document.getElementById('modalModelos');
    if (bs && el) {
      this.modal = new bs.Modal(el);
    }
  }

  cargarMarcas(): void {
    this.loadingMarcas = true;
    this.autosService.getMarcas().subscribe({
      next: (data) => {
        this.marcas = data;
        this.loadingMarcas = false;
      },
      error: (err: Error) => {
        this.error = err.message;
        this.loadingMarcas = false;
      },
    });
  }

  abrirModal(marca: Marca): void {
    this.marcaSeleccionada = marca;
    this.modelos = [];
    this.loadingModelos = true;
    this.modal?.show();

    this.autosService.getModelosByMarca(marca.id).subscribe({
      next: (data) => {
        this.modelos = data;
        this.loadingModelos = false;
      },
      error: (err: Error) => {
        this.error = err.message;
        this.loadingModelos = false;
      },
    });
  }
}
