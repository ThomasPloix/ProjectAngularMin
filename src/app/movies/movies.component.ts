import {Component, inject} from '@angular/core';
import {Observable} from "rxjs";
import {Movie} from "../models/movie";
import {MoviesService} from "../services/movies.service";
import {AsyncPipe, DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {CsvExportService} from "../services/csv-export.service";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  private readonly moviesService = inject(MoviesService)
  private exportService = inject(CsvExportService);
  movies$: Observable<Movie[]> = this.moviesService.getMovies();
  movies: Movie[] = [];

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(movies => this.movies = movies);
  }


  deleteMovie(id: number ): void {

    this.moviesService.deleteMovie(id).subscribe(
      () => {
        this.moviesService.deleteMovie(id).subscribe(() =>
          this.movies = this.movies.filter(film => film.id !== id)
        );
      }
    );

  }

  exportData() {
    this.exportService.exportToCsv('movies.csv', this.movies);
  }
}
