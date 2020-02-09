import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import {
  LoadTranslationsGuard,
  NGT_TRANSPILER,
  NgTranslationModule,
  TranslationConfig
} from 'ng-translation';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuxiliaryComponent } from './auxiliary/auxiliary.component';
import { ComponentsComponent } from './components/components.component';
import { LocalizationComponent } from './localization/localization.component';
import { RefreshTranslationComponent } from './refresh-translation/refresh-translation.component';
import { CustomTranspileExtender } from './custom-transpile-extender';

import { SpringModule } from './spring/spring.module';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'refresh-translation', component: RefreshTranslationComponent },
  { path: 'spring', loadChildren: () => import('./spring/spring.module').then(m => m.SpringModule) },
  { path: 'summer', loadChildren: () => import('./summer/summer.module').then(m => m.SummerModule),
                    canLoad: [ LoadTranslationsGuard ] },
  { path: 'autumn', loadChildren: () => import('./autumn/autumn.module').then(m => m.AutumnModule),
                    canLoad: [ LoadTranslationsGuard ] },
  { path: 'winter', loadChildren: () => import('./winter/winter.module').then(m => m.WinterModule),
                    canLoad: [ LoadTranslationsGuard ],
                    data: { sectionPrefix: 'frosty' } },
  { path: 'components', component: ComponentsComponent },
  { path: 'auxiliary', component: AuxiliaryComponent },
  { path: 'l10n', component: LocalizationComponent },
  { path: '**', redirectTo: 'home' }
];

const routerConfig: ExtraOptions = {
  onSameUrlNavigation: 'reload'
};

const ngtConfig: TranslationConfig = {
  translationUrl: '/assets/i18n/{ language }/{ section }.json',
  // translationUrl: '/assets/i18n/{section}.{language}.json',
  sections: [ 'app', 'l10n', 'spring', 'summer:summer', 'autumn:fall', 'frosty:winter' ],
  defaultLanguage: environment.defaultLanguage,
  disableWarnings: environment.disableWarnings
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ComponentsComponent,
    AuxiliaryComponent,
    LocalizationComponent,
    RefreshTranslationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot( routes, routerConfig ),
    MatToolbarModule,
    MatCardModule,
    NgTranslationModule.forRoot( ngtConfig ),
    SpringModule
  ],
  providers: [
    {
      provide: NGT_TRANSPILER,
      useClass: CustomTranspileExtender
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
