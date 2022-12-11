import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
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
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    NgTranslationModule.forRoot( translationConfig ),
    AppRouting,
    SpringModule,
    TestsModule
  ],
  exports: [
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [
    {
      provide: NGT_INLINE_LOADER,
      useFactory: getInlineLoaders
    }, {
      provide: NGT_TRANSLATION_CONVERTER,
      useClass: CustomTranslationConverter
    }, {
      provide: NGT_TRANSPILE_EXTENDER,
      useClass: CustomTranspileExtender
    }
  ],
  bootstrap: [
    AppComponent
  ]
} )
export class AppModule { }
