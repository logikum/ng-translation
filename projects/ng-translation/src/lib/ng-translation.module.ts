/* 3rd party libraries */
import { APP_INITIALIZER, NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

/* locally accessible feature module code, always use relative path */
import { TranslateDirective, TranslateParamsDirective } from './directives';
import {
  NGT_TRANSLATION_CONVERTER, NGT_TRANSPILE_EXTENDER, NGT_CONFIGURATION,
  TranslationConfig
} from './models';
import {
  ToCurrencyPipe, ToDatetimePipe, ToNumberPipe, ToPercentPipe, TranslatePipe
} from './pipes';
import {
  LocalizationService, MessengerService, TranslationService, TranspilerService
} from './services';
import { initializerFactory } from './initializer.factory';
import {
  localizationServiceFactory, messengerServiceFactory,
  translationServiceFactory, transpilerServiceFactory
} from './service.factory';
import { DefaultTranslationConverter } from './default-translation.converter';
import { DefaultTranspileExtender } from './default-transpile.extender';

@NgModule( {
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
} )
export class NgTranslationModule {

  static forRoot(
    config: TranslationConfig
  ): ModuleWithProviders<NgTranslationModule> {

    return {
      ngModule: NgTranslationModule,
      providers: [
        {
          provide: NGT_CONFIGURATION,
          useValue: config
        }, {
          provide: NGT_TRANSLATION_CONVERTER,
          useClass: DefaultTranslationConverter
        }, {
          provide: NGT_TRANSPILE_EXTENDER,
          useClass: DefaultTranspileExtender
        }, {
          provide: MessengerService,
          useFactory: messengerServiceFactory
        }, {
          provide: LocalizationService,
          useFactory: localizationServiceFactory,
          deps: [ MessengerService ]
        }, {
          provide: TranspilerService,
          useFactory: transpilerServiceFactory,
          deps: [ LocalizationService, MessengerService ]
        }, {
          provide: TranslationService,
          useFactory: translationServiceFactory,
          deps: [
            HttpClient, TranspilerService, MessengerService,
            NGT_CONFIGURATION, NGT_TRANSLATION_CONVERTER, NGT_TRANSPILE_EXTENDER
          ]
        }, {
          provide: APP_INITIALIZER,
          useFactory: initializerFactory,
          deps: [ TranslationService, NGT_CONFIGURATION ],
          multi: true
        }
      ]
    };
  }
}
