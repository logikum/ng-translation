import { APP_INITIALIZER, NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateDirective, TranslateParamsDirective } from './directives';
import { TRANSLATION_CONFIG, TranslationConfig } from './models';
import { TranslatePipe } from './pipes';
import { TranslationService } from './services';
import { initializerFactory } from './initializer.factory';
import { serviceFactory } from './service.factory';

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [
    TranslatePipe,
    TranslateDirective,
    TranslateParamsDirective
  ],
  exports: [
    TranslatePipe,
    TranslateDirective,
    TranslateParamsDirective
  ]
})
export class NgTranslationModule {

  static forRoot(
    config: TranslationConfig
  ): ModuleWithProviders<NgTranslationModule> {
    return {
      ngModule: NgTranslationModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: initializerFactory,
          deps: [ TranslationService, TRANSLATION_CONFIG ],
          multi: true
        },
        {
          provide: TranslationService,
          useFactory: serviceFactory,
          deps: [ HttpClient, TRANSLATION_CONFIG ]
        },
        {
          provide: TRANSLATION_CONFIG,
          useValue: config
        }
      ]
    };
  }

  static forChild(): ModuleWithProviders<NgTranslationModule> {
    return {
      ngModule: NgTranslationModule,
      providers: [ ]
    };
  }
}
