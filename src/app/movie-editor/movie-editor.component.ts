import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';


@Component({
    selector: 'app-movie-editor',
    templateUrl: './movie-editor.component.html',
    styleUrls: ['./movie-editor.component.css']
  })
  export class MovieEditorComponent {
   // @Input() moviesDuration: any;

    movieForm = this.fb.group({
        directorName: ['', Validators.required],
        title: ['', Validators.required],
        summary: ['', [Validators.required, Validators.minLength(10)]],
        producer: this.fb.group({
          name: ['', Validators.required],
          age: [0, Validators.required]
        }),
        actors: this.fb.array([
          this.fb.control('')
        ])
      });

      constructor(private fb: FormBuilder) { }

      get actors() {
        return this.movieForm.get('actors') as FormArray;
      }

      get producer() {
        return this.movieForm.get('producer') as FormGroup;
      }
    
      addActor() {
        this.actors.push(this.fb.control(''));
      }
     
      setMovieProfile() {
        this.movieForm.patchValue({
          directorName: 'Nora',
          title : 'Age24',
          summary : 'some summary words about the movie',
          producer : {name: 'Mel', age: 30}
        });
      }

      onSubmit() {
        // TODO: Use EventEmitter with form value        
          console.warn(this.movieForm.value);
        // console.warn(this.actors.value);
        // this.http.post('http:localhost:4200/api/movies', data)
        // .subscribe((result) => 
        // console.warn("result", result)
        // );
        }
  }  