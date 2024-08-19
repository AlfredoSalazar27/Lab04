import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { EpisodiosService } from '../servicios/episodios.service';

@Component({
  selector: 'app-episodios',
  standalone: true,
  imports: [MatTableModule, MatPaginator, CommonModule, MatCardModule],
  templateUrl: './episodios.component.html',
  styleUrls: ['./episodios.component.scss'],
  providers: [DatePipe],
})
export class EpisodiosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'air_date', 'episode', 'created'];
  episodios: any[] = [];
  totalResults: number = 0;
  pageSize: number = 20;
  currentPage: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private episodiosSrv: EpisodiosService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.loadEpisodios(this.currentPage + 1);
  }

  loadEpisodios(page: number) {
    this.episodiosSrv.getEpisodios(page).subscribe((datos: any) => {
      this.episodios = datos.results.map((episode: any) => ({
        ...episode,
        air_date: this.datePipe.transform(episode.air_date, 'medium'),
        created: this.datePipe.transform(episode.created, 'medium'),
      }));
      this.totalResults = datos.info.count;
    });
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEpisodios(this.currentPage + 1);
  }
}