import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from './movie';
import {Actor} from './actor'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private moviesUrl = 'api/movies';
  private actorsUrl = 'api/actors';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** POST: add a new movie to the server */
  addMovie(movie: Movie): Observable<Movie> {

        return this.http.post<Movie>(this.moviesUrl, movie, this.httpOptions).pipe(
          tap((newMovie: Movie) => console.log(`added movie w/ id=${newMovie.id}`)),
          catchError(this.handleError<Movie>('addMovie'))
        );
  }

  addActor(actor: Actor): Observable<Actor> {
    const url = this.actorsUrl;
    console.log('actor url', url);
    return this.http.post<Actor>(url, actor, this.httpOptions).pipe(
      tap((newActor: Actor) => console.log(`added actor w/ id=${newActor.movieId}/${newActor.id}`)),
      catchError(this.handleError<Actor>('addActor'))
    );
}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add("movie title added");
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl).pipe(
      tap(_ => this.log('fetched movies')),
      catchError(this.handleError<Movie[]>('getMovies', []))
    );
  }
  getMovie(id: number): Observable<Movie> {
    const url = `${this.moviesUrl}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(_ => this.log(`fetched movie id=${id}`)),
      catchError(this.handleError<Movie>(`getMovie id=${id}`))
    );
  }

  getActors(movieId: number) : Observable<Actor[]> {
    const url = `${this.actorsUrl}/?movieId=${movieId}`;
    return this.http.get<Actor[]>(url).pipe(
      tap(_ => this.log('fetched actors')),
      catchError(this.handleError<Actor[]>('getActors', []))
    );
  }

  getActor( actorId: number): Observable<Actor> {
    const url = `${this.actorsUrl}/${actorId}`;
    return this.http.get<Actor>(url).pipe(
      tap(_ => this.log(`fetched actor id=${actorId}`)),
      catchError(this.handleError<Actor>(`getActor id=${actorId}`))
    );
  }

    /* GET movies whose name contains search term */
    searchMovies(term: string): Observable<Movie[]> {
      if (!term.trim()) {
        // if not search term, return empty hero array.
        return of([]);
      }
      return this.http.get<Movie[]>(`${this.moviesUrl}/?name=${term}`).pipe(
        tap(x => x.length ?
           this.log(`found movies matching "${term}"`) :
           this.log(`no movies matching "${term}"`)),
        catchError(this.handleError<Movie[]>('searchMovies', []))
      );
    } 
  
    /** DELETE: delete the movie from the server */
    deleteMovie(id: number): Observable<Movie> {
      const url = `${this.moviesUrl}/${id}`;
  
      return this.http.delete<Movie>(url, this.httpOptions).pipe(
        tap(_ => this.log(`deleted movie id=${id}`)),
        catchError(this.handleError<Movie>('deleteMovie'))
      );
    }

    deleteActor(movieId:number, actorId:number): Observable<Actor>{
      const url =  `${this.moviesUrl}/${movieId}/${actorId}`;

      return this.http.delete<Actor>(url, this.httpOptions).pipe(
        tap(_ => this.log(`deleted actor id=${movieId}/${actorId}`)),
        catchError(this.handleError<Actor>('deleteActor'))
      );
    }
  
    /** PUT: update the movie on the server */
    updateMovie(movie: Movie): Observable<any> {
      return this.http.put(this.moviesUrl, movie, this.httpOptions).pipe(
        tap(_ => this.log(`updated movie id=${movie.id}`)),
        catchError(this.handleError<any>('updateMovie'))
      );
    }

    updateActor(actor: Actor): Observable<any> {
      const actorUrl = `${this.actorsUrl}/${actor.id}`;
      return this.http.put(actorUrl, actor, this.httpOptions).pipe(
        tap(_ => this.log(`updated actor ${actor.id}`)),
        catchError(this.handleError<any>('updateActor'))
      );
    }

}
