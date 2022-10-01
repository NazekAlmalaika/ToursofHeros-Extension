import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Actor } from '../actor';
import { ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {
  actors: Actor[] = [];

  clicked:boolean=false;
  movieId:any;

   routt = this.route.params.subscribe((routeParams: Params) => {
     this.movieId = parseInt(routeParams['id']!, 10);
     console.log(this.movieId);
  });

  form = this.fb.group({
    actor: this.fb.array([])
});

  constructor( private movieService: ServiceService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log('actors in actors component form movie component', this.actors);
   this.route.params.subscribe((routeParams: Params) => {
      const movieId = parseInt(routeParams['id']!, 10);
     this.movieService.getActors(movieId).subscribe(actors => {
     let newActors=  actors.forEach((actr :Actor) => {if(actr.name == null){return; console.log(' execluded actor from the actors', actr)}})
      console.log('actors for the current specific movie', actors);
      this.actors = actors
    });
  });
  }

  get actor() {
    return this.form.controls["actor"] as FormArray;
  }

  addActor() {

    const actorForm: FormGroup =this.fb.group({
      name: ['', Validators.required],
      age: [0, Validators.required],
      height: [0, Validators.required],
      weight: [0, Validators.required]
    });
    this.actor.push(actorForm);
  }

  resetAddActorForm(){
    this.form.reset();
  }

  addActorsToMovie(actorFormValue: any){
    actorFormValue.value.actor.forEach((actr: Actor) => {
      if(actr.name == null){
        return;
      }
    })
    this.route.params.subscribe((routeParams: Params) => {
      let movieId = parseInt(routeParams['id']!, 10);
      console.log('movie id for the new added actor', routeParams);

    if (!this.form) { return; }
    // console.log('actor form value', actorFormValue)
    actorFormValue.value.actor.forEach((actr: Actor) => {
      actr.movieId = movieId;
      console.log('the new added actor', actr);
          this.movieService.addActor(actr)
        .subscribe(actor => {
          if(actor.name == null) {
            return;}
          console.log('the new added actor after updating the movie',actor);
          this.actors.push(actor);
        });
    }); });
}

deleteActor(actor: Actor): void {
  this.actors = this.actors.filter(h => h !== actor);
  this.route.params.subscribe((routeParams: Params) => {
    const movieId = parseInt(routeParams['id']!, 10);
  this.movieService.deleteActor(movieId, actor.id).subscribe();});
}

onSubmit(actorForm : FormGroup) {
  actorForm.value.actor.forEach((actr: Actor) => {
    if(actr.name == null){
      return;
    }
  })
  this.addActorsToMovie(actorForm);
  this.resetAddActorForm();

  }
}
