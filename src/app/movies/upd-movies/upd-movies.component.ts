import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Movie} from "../../models/movie";
import {MoviesService} from "../../services/movies.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";



@Component({
  selector: 'app-upd-movies',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe
  ],
  providers: [DatePipe],
  templateUrl: './upd-movies.component.html',
  styleUrl: './upd-movies.component.scss'
})
export class UpdMoviesComponent implements OnInit{
  constructor(private route: ActivatedRoute) {}

  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined
  }

  date : string | null | undefined;

  private readonly moviesService = inject(MoviesService)
  private router = inject(Router);
  private datePipe = inject(DatePipe);
  ngOnInit() {
    this.route.queryParamMap.subscribe((paramMap) => {
     const idmovie = paramMap.get('idmovie');

     // @ts-ignore
      this.moviesService.getMovie(idmovie).subscribe(movies => {
        this.movie = movies
        this.date = this.datePipe.transform(this.movie.releaseDate, 'yyyy-MM-dd');
        console.log(this.movie);});

    });

  }

  updateMovie(): void {
    console.log(this.movie);
    this.movie.releaseDate = this.date ? new Date(this.date) : new Date();
    this.moviesService.updateMovie(this.movie).subscribe(
      () => this.router.navigate(['/movies'])
    );
  }
}
