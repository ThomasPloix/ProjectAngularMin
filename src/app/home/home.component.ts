import {Component, inject} from '@angular/core';
import {MoviesService} from "../services/movies.service";
import {Movie} from "../models/movie";
import {Observable} from "rxjs";
import {AsyncPipe, DatePipe} from "@angular/common";
import {MovieComponent} from "./movie/movie.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    MovieComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly moviesService = inject(MoviesService)
  movies$: Observable<Movie[]> = this.moviesService.getMovies();

}
