import { Component, OnInit} from '@angular/core';
import { ServiceService } from '../service.service';
import { Movie } from '../movie';
import {Actor} from '../actor';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { MoviesComponent } from '../movies/movies.component';

@Component({
    selector: 'app-movie-detail',
    templateUrl: './movie-detail.component.html',
    styleUrls: ['./movie-detail.component.css']
  })
  export class MovieDetailComponent implements OnInit{
    movie: Movie | undefined;
    actor: Actor | undefined;

    movies: Movie[] = [];
    actors: Actor[] =[];

      constructor(
        private route: ActivatedRoute,
        private movieService: ServiceService, 
        public messageService: MessageService,  
        private location: Location) { }

        ngOnInit(): void {
          console.log('movie details component');
          this.getMovie();
        }

        getMovie(): void {
          this.route.params.subscribe((routeParams: Params) => {
          const id = parseInt(routeParams['id']!, 10);
          console.log('movie id', routeParams);
          this.movieService.getMovie(id)
            .subscribe(movie => this.movie = movie);
          });
        }
   
        updateMovie(): void {
          if (this.movie) {
            this.movieService.updateMovie(this.movie)
              .subscribe();
          }
        }

        deleteMovie(movie: Movie): void {
          this.movies = this.movies.filter(h => h !== movie);
          this.movieService.deleteMovie(movie.id).subscribe();
        }

        goBack(): void {
          this.location.back();
        }
  }  