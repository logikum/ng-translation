import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import {
  LoadTranslationsGuard, NGT_TRANSLATION_CONVERTER, NGT_TRANSPILE_EXTENDER,
  NgTranslationModule, NGT_INLINE_LOADER, InlineLoaderMap, getModuleItems
} from 'ng-translation';

import { translationConfig } from './translation.config';
import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuxiliaryComponent } from './auxiliary/auxiliary.component';
import { ComponentsComponent } from './components/components.component';
import { LocalizationComponent } from './localization/localization.component';
import { NullComponent } from './null/null.component';

import { CustomTranslationConverter } from './custom-translation-converter';
import { CustomTranspileExtender } from './custom-transpile-extender';

import { SpringModule } from './spring/spring.module';
import { addAutumnLoaders } from './autumn/add-autumn-loaders';

export function getInlineLoaders(): InlineLoaderMap {

  const loaders: InlineLoaderMap = { };
  addAutumnLoaders( loaders, translationConfig );
  return loaders;
}

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'spring',
    loadChildren: () => import('./spring/spring.module').then(m => m.SpringModule) },
  { path: 'summer',
    loadChildren: () => import('./summer/summer.module').then(m => m.SummerModule),
    canLoad: [ LoadTranslationsGuard ] },
  { path: 'autumn',
    loadChildren: () => import('./autumn/autumn.module').then(m => m.AutumnModule),
    canLoad: [ LoadTranslationsGuard ] },
  { path: 'winter',
    loadChildren: () => import('./winter/winter.module').then(m => m.WinterModule),
    canLoad: [ LoadTranslationsGuard ],
    data: { translationGroup: 'frosty' } },
  { path: 'components', component: ComponentsComponent },
  { path: 'auxiliary', component: AuxiliaryComponent },
  { path: 'l10n', component: LocalizationComponent },
  { path: 'null', component: NullComponent },
  { path: 'conversion',
    loadChildren: () => import('./conversion/conversion.module').then(m => m.ConversionModule),
    canLoad: [ LoadTranslationsGuard ] },
  { path: '**', redirectTo: 'home' }
];

const routerConfig: ExtraOptions = {
  onSameUrlNavigation: 'reload',
  enableTracing: false
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ComponentsComponent,
    AuxiliaryComponent,
    LocalizationComponent,
    NullComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot( routes, routerConfig ),
    MatToolbarModule,
    MatCardModule,
    NgTranslationModule.forRoot( translationConfig ),
    // AppRouting,
    SpringModule
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
})
export class AppModule { }
