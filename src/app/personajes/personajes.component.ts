import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { PersonajesService } from '../servicios/personajes.service';

@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatPaginator],
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.scss'],
})
export class PersonajesComponent {
  personajes: any[] = [];
  totalResults: number = 0;
  pageSize: number = 20;
  currentPage: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private personajesSrv: PersonajesService) {}

  ngOnInit() {
    this.loadPersonajes(this.currentPage + 1);
  }

  loadPersonajes(page: number) {
    this.personajesSrv.getPersonajes(page).subscribe((datos: any) => {
      this.personajes = datos.results;
      this.totalResults = datos.info.count;
    });
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPersonajes(this.currentPage + 1);
  }
}
