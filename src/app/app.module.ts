import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgTranslationModule, CanLoadTranslationsGuard } from 'ng-translation';

import { FilmsModule } from './films/films.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, runGuardsAndResolvers: 'always' },
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
        onSameUrlNavigation: 'reload',
        enableTracing: false // <-- debugging purposes only
      }
    ),
    NgTranslationModule.forRoot( {
      translationUrl: '/assets/i18n/{ language }/{ section }.json',
      // translationUrl: '/assets/i18n/{section}.{language}.json',
      sections: [ 'app', 'films', 'books:books', 'music:music' ],
      defaultLanguage: 'en',
      // activeLanguage: 'hu'
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
