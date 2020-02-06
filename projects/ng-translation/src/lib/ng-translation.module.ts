import { APP_INITIALIZER, NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateDirective, TranslateParamsDirective } from './directives';
import { NGT_TRANSPILER, NGT_CONFIGURATION, TranslationConfig } from './models';
import { ToCurrencyPipe, ToDatetimePipe, ToNumberPipe, ToPercentPipe, TranslatePipe } from './pipes';
import { LocalizationService, MessengerService, TranslationService, TranspilerService } from './services';
import { initializerFactory } from './initializer.factory';
import {
  localizationServiceFactory, messengerServiceFactory,
  translationServiceFactory, transpilerServiceFactory
} from './service.factory';
import { DefaultTranspileExtender } from './default-transpile.extender';

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [
    ToCurrencyPipe,
    ToDatetimePipe,
    ToNumberPipe,
    ToPercentPipe,
    TranslatePipe,
    TranslateDirective,
    TranslateParamsDirective
  ],
  exports: [
    ToCurrencyPipe,
    ToDatetimePipe,
    ToNumberPipe,
    ToPercentPipe,
    TranslatePipe,
    TranslateDirective,
    TranslateParamsDirective
  ]
})
export class NgTranslationModule {

  static forRoot(
    config: TranslationConfig
  ): ModuleWithProviders<NgTranslationModule> {

    const extender = new DefaultTranspileExtender();
    return {
      ngModule: NgTranslationModule,
      providers: [
        {
          provide: NGT_CONFIGURATION,
          useValue: config
        },
        {
          provide: NGT_TRANSPILER,
          useClass: DefaultTranspileExtender
        },
        {
          provide: MessengerService,
          useFactory: messengerServiceFactory,
          deps: [ NGT_CONFIGURATION ]
        },
        {
          provide: LocalizationService,
          useFactory: localizationServiceFactory,
          deps: [ MessengerService ]
        },
        {
          provide: TranspilerService,
          useFactory: transpilerServiceFactory,
          deps: [ LocalizationService, MessengerService ]
        },
        {
          provide: TranslationService,
          useFactory: translationServiceFactory,
          deps: [ HttpClient, TranspilerService, MessengerService, NGT_CONFIGURATION, NGT_TRANSPILER ]
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initializerFactory,
          deps: [ TranslationService, NGT_CONFIGURATION ],
          multi: true
        }
      ]
    };
  }
}
