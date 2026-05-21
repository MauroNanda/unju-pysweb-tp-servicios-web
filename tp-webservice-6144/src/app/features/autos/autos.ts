import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, inject } from '@angular/core';

import { Marca, Modelo } from '../../core/models/auto.model';
import { AutosService } from '../../core/services/autos.service';

@Component({
  selector: 'app-autos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './autos.html',
})
export class Autos implements OnInit, AfterViewInit {
  private readonly autosService = inject(AutosService);

  marcas: Marca[] = [];
  modelos: Modelo[] = [];
  marcaSeleccionada: Marca | null = null;

  loadingMarcas = false;
  loadingModelos = false;
  error: string | null = null;

  // Referencia al modal Bootstrap nativo (cargado por el bundle global)
  // @ts-ignore — bootstrap está en window por estar en angular.json > scripts
  private modal: any;

  ngOnInit(): void {
    this.cargarMarcas();
  }

  ngAfterViewInit(): void {
    // @ts-ignore — bootstrap viene del script global
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
