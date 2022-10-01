import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Movie } from './movie';
import { MoviesComponent } from './movies/movies.component';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
   return { 
    movies: [
      {id : 1, directorName: 'mel' , title : 'IceAge' , summary: 'IceAgesumsumsumssums', producer : {name: 'IceAgeprodname', age:40}},
      {id : 2, directorName: 'john' , title : 'flag' , summary: 'flagsumsumsumssums', producer : {name: 'flagprodname', age:70} },
      {id : 3, directorName: 'maya' , title : 'Adel' , summary: 'Adelsumsumsumssums', producer : {name: 'Adelprodname', age:50}},
    ],
    actors : [
      {id:1, name:'sed', age: 30, weight: 70, height:165, movieId:1},
      {id:2, name:'ee', age: 30, weight: 70, height:165, movieId:2},
      {id:3, name:'dd', age: 30, weight: 70, height:165, movieId:3}
    ]
  }
  }
  genId(movies: Movie[]): number {
    return movies.length > 0 ? Math.max(...movies.map(movie => movie.id)) + 1 : 11;
  }
}