import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Movie } from '../movie';
import {Actor} from '../actor';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  movie: Movie | undefined;
  @Input() actor: Actor | undefined;

  movies: Movie[] = [];
  actors: Actor[] =[];
  movieId: any;


    constructor(
      private route: ActivatedRoute,
      private movieService: ServiceService,
      public messageService: MessageService,
      private location: Location) { }

      ngOnInit(): void {
        console.log('actor details component');
        this.getActor();
      }

      getActor(): void {
        this.route.params.subscribe((routeParams: Params) => {
        const actorId = parseInt(routeParams['actorId']!, 10);
        console.log('actor actorId', routeParams);
        this.movieService.getActor(actorId)
          .subscribe(actor => this.actor = actor);
        });
      }

      updateActor(): void {

        this.route.params.subscribe((routeParams: Params) => {
          this.movieId = parseInt(routeParams['id']!, 10);
        if (this.actor) {
          this.movieService.updateActor(this.actor)
            .subscribe();
        }
      })
    }

      goBack(): void {
        this.location.back();
      }
}
