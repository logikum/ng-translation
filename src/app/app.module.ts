import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgTranslationModule } from '../../projects/ng-translation/src/lib/ng-translation.module';
import { CanLoadTranslationsGuard } from '../../projects/ng-translation/src/lib/can-load-translations.guard';
import { FilmsModule } from './films/films.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'books', loadChildren: './books/books.module#BooksModule', canLoad: [CanLoadTranslationsGuard] },
  { path: 'music', loadChildren: './music/music.module#MusicModule', canLoad: [CanLoadTranslationsGuard] },
  { path: 'films', loadChildren: './films/films.module#FilmsModule' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      routes,
      {
        initialNavigation: 'enabled',
        enableTracing: true // <-- debugging purposes only
      }
    ),
    NgTranslationModule.forRoot( {
      translationUrl: '/assets/i18n',
      sections: [ 'app', 'films', 'books:books', 'music:music' ],
      defaultLanguage: 'en',
      // activeLanguage: 'en'
    } ),
    FilmsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
