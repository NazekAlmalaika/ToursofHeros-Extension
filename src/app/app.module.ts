import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule} from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';


import { AppComponent } from './app.component';
import { NameEditorComponent } from './name-editor/name-editor.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { MovieEditorComponent } from './movie-editor/movie-editor.component';
import { MoviesComponent } from './movies/movies.component';
import { MessagesComponent } from './messages/messages.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { ActorsComponent } from './actors/actors.component';
import { ActorComponent } from './actor/actor.component';



const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'detail/:id', component: MovieDetailComponent },
  { path: 'actorDetail/:actorId', component: ActorComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NameEditorComponent,
    ProfileEditorComponent,
    MovieEditorComponent,
    MoviesComponent,
    MessagesComponent,
    MovieDetailComponent,
    MovieSearchComponent,
    ActorsComponent,
    ActorComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    // other imports ...
    ReactiveFormsModule,
    DropDownListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatInputModule,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
