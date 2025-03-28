import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import {
  NGT_TRANSLATION_CONVERTER, NGT_TRANSPILE_EXTENDER, NgTranslationModule,
  NGT_INLINE_LOADER, InlineLoaderMap
} from 'ng-translation';

import { translationConfig } from './translation.config';
import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { CustomTranslationConverter } from './custom-translation-converter';
import { CustomTranspileExtender } from './custom-transpile-extender';

import { SpringModule } from '../seasons/spring/spring.module';
import { addAutumnLoaders } from '../seasons/autumn/add-autumn-loaders';
import { TestsModule } from '../tests/tests.module';

export function getInlineLoaders(): InlineLoaderMap {

  const loaders: InlineLoaderMap = {};
  addAutumnLoaders( loaders, translationConfig );
  return loaders;
}

@NgModule( {
  declarations: [
    AppComponent,
    HomeComponent
  ],
  bootstrap: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    NgTranslationModule.forRoot(translationConfig),
    AppRouting,
    SpringModule,
    TestsModule], providers: [
    {
      provide: NGT_INLINE_LOADER,
      useFactory: getInlineLoaders
    }, {
      provide: NGT_TRANSLATION_CONVERTER,
      useClass: CustomTranslationConverter
    }, {
      provide: NGT_TRANSPILE_EXTENDER,
      useClass: CustomTranspileExtender
    },
    provideHttpClient( withInterceptorsFromDi() )
  ]
} )
export class AppModule { }
