import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { ServiceService } from '../service.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actor } from '../actor';


@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css']
  })
  export class MoviesComponent implements OnInit {

     movies: Movie[] = [];
     addActorFirstClick: boolean =false;
     addActorSecondClick: boolean =true;

     movieForm: FormGroup = this.fb.group({
      directorName: ['', Validators.required],
      title: ['', Validators.required],
      summary: ['', [Validators.required, Validators.minLength(10)]],
      producer: this.fb.group({
        name: ['', Validators.required],
        age: [0, Validators.required]
      }),
      actors: this.fb.array([])
    });

    constructor( private movieService: ServiceService, private fb: FormBuilder) {
    }

      ngOnInit(): void {
        this.movieService.getMovies().subscribe(movies => this.movies = movies);
      }

      add(title: string): void {
        title = title.trim();
        if (!title) { return; }
        this.movieService.addMovie({ title } as Movie)
          .subscribe(movie => {
            this.movies.push(movie);
          });
      }

      get actors(): FormArray {
        return this.movieForm.controls["actors"] as FormArray;
      }

      addActor() {
        const actorForm: FormGroup =this.fb.group({
          name: ['', Validators.required],
          age: [0, Validators.required],
          height: [0, Validators.required],
          weight: [0, Validators.required]
        });
        this.actors.push(actorForm);
      }

      resetAddActorForm(){
        this.movieForm.controls["actors"].reset();
        this.addActorSecondClick = false;
      }

      addActorsToMovie(movieFormValue: any, movieId: any){
        if (!this.movieForm) { return; }
        console.log('add movie actors', movieFormValue);
        movieFormValue.actors.forEach((actor: Actor) => {
          actor.movieId = movieId;
              this.movieService.addActor(actor)
            .subscribe(actor => {
              console.log('the new added actor after updating the movie',actor);
              this.actors.push(actor);
            });
        });
      }

      addMovie(movieForm: FormGroup): void {
        console.log(movieForm.value);
        if (!movieForm) { return; }
         this.movieService.addMovie(movieForm.value)
           .subscribe(movie => {
            let movieId=movie.id;
            console.log('movie : ', movie);
             this.movies.push(movie);
             this.addActorsToMovie(movieForm.value , movieId);
           });
      }

      delete(movie: Movie): void {
        this.movies = this.movies.filter(h => h !== movie);
        this.movieService.deleteMovie(movie.id).subscribe();
      }

      onSubmit(movieForm : FormGroup) {
        this.addMovie(movieForm);
        }
  }
