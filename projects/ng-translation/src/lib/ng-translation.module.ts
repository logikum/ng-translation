import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslationConfig } from './translation.config';
import { TranslatePipe } from './translate.pipe';
import { TranslationService } from './translation.service';

let configuration: TranslationConfig;

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [
    TranslatePipe
  ],
  exports: [
    TranslatePipe
  ],
  providers: [
    TranslationService,
    {
      provide: APP_INITIALIZER,
      useFactory: TranslationService.initialize,
      multi: true,
      deps: [ TranslationConfig, HttpClient ]
    },
    {
      provide: TranslationConfig,
      useFactory: () => configuration,
      multi: false
    },
    TranslationService
  ]
})
export class NgTranslationModule {

  static forRoot(
    config: TranslationConfig
  ): ModuleWithProviders {
    configuration = config;
    return {
      ngModule: NgTranslationModule,
      providers: [
        {
          provide: TranslationService,
          useFactory: http => new TranslationService( http ),
          deps: [ HttpClient ]
        }
      ]
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: NgTranslationModule,
      providers: [
        {
          provide: TranslationService,
          useFactory: http => new TranslationService( http ),
          deps: [ HttpClient ]
        }
      ]
    };
  }
}
