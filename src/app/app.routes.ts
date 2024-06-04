import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MoviesComponent} from "./movies/movies.component";
import {AddMovieComponent} from "./movies/add-movie/add-movie.component";
import {UpdMoviesComponent} from "./movies/upd-movies/upd-movies.component";

export const routes: Routes =
  [ { path: '', component: HomeComponent},
  { path: 'movies', component: MoviesComponent},
  { path: 'add-movie', component: AddMovieComponent},
  { path: 'upd-movie', component: UpdMoviesComponent}
  ];
