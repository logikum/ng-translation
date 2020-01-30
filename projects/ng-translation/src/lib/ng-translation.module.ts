import { APP_INITIALIZER, NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateDirective, TranslateParamsDirective } from './directives';
import { DefaultTranspileExtender, NGT_TRANSPILER, NGT_CONFIGURATION, TranslationConfig } from './models';
import { TranslatePipe } from './pipes';
import { MessengerService, TranslationService } from './services';
import { initializerFactory } from './initializer.factory';
import { messengerServiceFactory, translationServiceFactory } from './service.factory';

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
          deps: [ TranslationService, NGT_CONFIGURATION ],
          multi: true
        },
        {
          provide: TranslationService,
          useFactory: translationServiceFactory,
          deps: [ HttpClient, NGT_CONFIGURATION, NGT_TRANSPILER ]
        },
        {
          provide: MessengerService,
          useFactory: messengerServiceFactory,
          deps: [ NGT_CONFIGURATION ]
        },
        {
          provide: NGT_CONFIGURATION,
          useValue: config
        },
        {
          provide: NGT_TRANSPILER,
          useClass: DefaultTranspileExtender
        }
      ]
    };
  }
}
