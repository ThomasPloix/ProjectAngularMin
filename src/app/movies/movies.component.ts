import {Component, inject} from '@angular/core';
import {Observable} from "rxjs";
import {Movie} from "../models/movie";
import {MoviesService} from "../services/movies.service";
import {AsyncPipe, DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";

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
}
