import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { Generation, Marca, Modelo, Trim, TrimSpecs } from '../../core/models/auto.model';
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
  generaciones: Generation[] = [];
  trims: Trim[] = [];

  marcaSeleccionada: Marca | null = null;
  modeloSeleccionado: Modelo | null = null;
  generacionSeleccionada: Generation | null = null;
  trimSeleccionado: Trim | null = null;
  specsActuales: TrimSpecs | null = null;

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
  loadingGeneraciones = false;
  loadingTrims = false;
  loadingSpecs = false;

  error: string | null = null;
  errorModelos: string | null = null;

  private modal: any;

  ngOnInit(): void {
    this.cargarMarcas();
  }

  ngAfterViewInit(): void {
    const bs = (window as any)['bootstrap'];
    const el = document.getElementById('modalModelos');
    if (bs && el) {
      this.modal = new bs.Modal(el);
      el.addEventListener('hidden.bs.modal', () => this.resetModalNav());
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
    this.resetModalNav();
    this.marcaSeleccionada = marca;
    this.modelos = [];
    this.loadingModelos = true;
    this.errorModelos = null;
    this.modal?.show();

    this.autosService.getModelosByMarca(marca.id).subscribe({
      next: (data) => {
        this.modelos = data;
        this.loadingModelos = false;
      },
      error: (err: Error) => {
        this.errorModelos = err.message;
        this.loadingModelos = false;
      },
    });
  }

  seleccionarModelo(m: Modelo): void {
    this.modeloSeleccionado = m;
    this.loadingSpecs = true;
    this.errorModelos = null;
    
    this.autosService.getGenerationsByModel(m.id).pipe(
      switchMap(gens => {
        if (!gens.length) throw new Error('No hay generaciones disponibles para este modelo.');
        this.generaciones = gens;
        this.generacionSeleccionada = gens[0];
        return this.autosService.getTrimsByGeneration(gens[0].id);
      }),
      switchMap(trims => {
        if (!trims.length) throw new Error('No hay versiones disponibles.');
        this.trims = trims;
        this.trimSeleccionado = trims[0];
        return this.autosService.getSpecsByTrim(trims[0].id);
      })
    ).subscribe({
      next: (specs) => {
        this.specsActuales = specs;
        this.loadingSpecs = false;
      },
      error: (e) => { 
        this.errorModelos = e.message; 
        this.loadingSpecs = false; 
      }
    });
  }

  cambiarGeneracion(g: Generation): void {
    this.generacionSeleccionada = g;
    this.loadingSpecs = true;
    this.errorModelos = null;
    
    this.autosService.getTrimsByGeneration(g.id).pipe(
      switchMap(trims => {
        if (!trims.length) throw new Error('No hay versiones en esta generación.');
        this.trims = trims;
        this.trimSeleccionado = trims[0];
        return this.autosService.getSpecsByTrim(trims[0].id);
      })
    ).subscribe({
      next: (specs) => {
        this.specsActuales = specs;
        this.loadingSpecs = false;
      },
      error: (e) => { this.errorModelos = e.message; this.loadingSpecs = false; }
    });
  }

  cambiarTrim(t: Trim): void {
    this.trimSeleccionado = t;
    this.loadingSpecs = true;
    this.errorModelos = null;
    
    this.autosService.getSpecsByTrim(t.id).subscribe({
      next: (specs) => {
        this.specsActuales = specs;
        this.loadingSpecs = false;
      },
      error: (e) => { this.errorModelos = e.message; this.loadingSpecs = false; }
    });
  }

  resetModalNav(): void {
    this.modeloSeleccionado = null;
    this.generacionSeleccionada = null;
    this.trimSeleccionado = null;
    this.specsActuales = null;
    this.errorModelos = null;
  }
}
