import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule, MatCardModule } from '@angular/material';

import { NgTranslationModule, LoadTranslationsGuard } from 'ng-translation';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RefreshTranslationComponent } from './refresh-translation/refresh-translation.component';

import { SpringModule } from './spring/spring.module';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'refresh-translation', component: RefreshTranslationComponent },
  { path: 'spring', loadChildren: './spring/spring.module#SpringModule' },
  { path: 'summer', loadChildren: './summer/summer.module#SummerModule',
                    canLoad: [ LoadTranslationsGuard ] },
  { path: 'autumn', loadChildren: './autumn/autumn.module#AutumnModule',
                    canLoad: [ LoadTranslationsGuard ] },
  { path: 'winter', loadChildren: './winter/winter.module#WinterModule',
                    canLoad: [ LoadTranslationsGuard ],
                    data: { sectionPrefix: 'frosty' } },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RefreshTranslationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot( routes, { onSameUrlNavigation: 'reload' } ),
    MatToolbarModule,
    MatCardModule,
    NgTranslationModule.forRoot( {
      translationUrl: '/assets/i18n/{ language }/{ section }.json',
      // translationUrl: '/assets/i18n/{section}.{language}.json',
      sections: [ 'app', 'spring', 'summer:summer', 'autumn:fall', 'frosty:winter' ],
      defaultLanguage: 'en'
    } ),
    SpringModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
