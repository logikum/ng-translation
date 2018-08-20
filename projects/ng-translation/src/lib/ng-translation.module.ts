import { APP_INITIALIZER, NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslationConfig } from './translation.config';
import { TranslatePipe } from './translate.pipe';
import { TranslationService } from './translation.service';

export function initializerFactory(
  service: TranslationService,
  config: TranslationConfig
) {
  function initializer() {
    service.initializeApp( config )
      .then( () => {
        service.changeLanguage( config.activeLanguage || config.defaultLanguage );
      } );
  }
  return initializer;
}

export function serviceFactory(
  http: HttpClient
) {
  return new TranslationService( http );
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [
    TranslatePipe
  ],
  exports: [
    TranslatePipe
  ]
})
export class NgTranslationModule {

  static forRoot(
    config: TranslationConfig
  ): ModuleWithProviders {
    return {
      ngModule: NgTranslationModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: initializerFactory,
          multi: true,
          deps: [ TranslationService, TranslationConfig ]
        },
        {
          provide: TranslationService,
          useFactory: serviceFactory,
          deps: [ HttpClient ]
        },
        {
          provide: TranslationConfig,
          useValue: config,
          multi: false
        }
      ]
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: NgTranslationModule,
      providers: [ ]
    };
  }
}
