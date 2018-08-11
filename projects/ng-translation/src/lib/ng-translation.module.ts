import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslationConfig } from './translation.config';
import { TranslatePipe } from './translate.pipe';
import { TranslationService } from './translation.service';

function initialize(
  service: TranslationService,
  config: TranslationConfig
) {
  return () => service.initialize( config );
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
          useFactory: initialize,
          multi: true,
          deps: [ TranslationService, TranslationConfig ]
        },
        {
          provide: TranslationService,
          useFactory: http => new TranslationService( http ),
          deps: [ HttpClient ]
        },
        {
          provide: TranslationConfig,
          useFactory: () => config,
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
