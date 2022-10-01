import { Component } from '@angular/core';
import { MessageService } from './message.service';

export type EditorType = 'name' | 'profile' | 'movie' | 'movies'| 'preview' | 'moviesDetails';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public messageService: MessageService) {}

  editor: EditorType = 'name';

  get showNameEditor() {
    return this.editor === 'name';
  }

  get showProfileEditor() {
    return this.editor === 'profile';
  }

  get showMovieEditor() {
    return this.editor === 'movie';
  }

  
  get showMovies() {
    return this.editor === 'movies';
  }

  get showMoviesDetails() {
    console.log(this.editor === 'moviesDetails');
    return this.editor === 'moviesDetails';
  }

  toggleEditor(type: EditorType) {
    this.editor = type;
  }
}
