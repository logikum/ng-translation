/* 3rd party libraries */
import { NgModule, ModuleWithProviders, inject, provideAppInitializer } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NGT_CONFIGURATION, NGT_FORMAT_EXTENDER, TranslationConfig } from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import {
  NgtContextDirective, NgtHtmlDirective, NgtParamsDirective, NgtTextDirective,
} from './directives';
import { NGT_TRANSLATION_CONVERTER, NGT_INLINE_LOADER } from './models';
import {
  ToMoneyPipe, ToCurrencyPipe, ToDatePipe, ToDatetimePipe, ToNumberPipe,
  ToPercentPipe, ToTimePipe, TranslatePipe
} from './pipes';
import { TranslationService } from './translation.service';
import { initializerFactory } from './initializer.factory';
import { DefaultTranslationConverter } from './default-translation.converter';
import { DefaultFormatExtender } from './default-format.extender';

@NgModule( {
  declarations: [
    ToMoneyPipe,
    ToCurrencyPipe,
    ToDatePipe,
    ToDatetimePipe,
    ToNumberPipe,
    ToPercentPipe,
    ToTimePipe,
    TranslatePipe,
    NgtContextDirective,
    NgtHtmlDirective,
    NgtParamsDirective,
    NgtTextDirective
  ],
  exports: [
    ToMoneyPipe,
    ToCurrencyPipe,
    ToDatePipe,
    ToDatetimePipe,
    ToNumberPipe,
    ToPercentPipe,
    ToTimePipe,
    TranslatePipe,
    NgtContextDirective,
    NgtHtmlDirective,
    NgtParamsDirective,
    NgtTextDirective
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
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
          provide: NGT_INLINE_LOADER,
          useValue: { }
        }, {
          provide: NGT_TRANSLATION_CONVERTER,
          useClass: DefaultTranslationConverter
        }, {
          provide: NGT_FORMAT_EXTENDER,
          useClass: DefaultFormatExtender
        },
        provideAppInitializer( () => {
          const initializerFn = initializerFactory(
            inject(TranslationService), inject(NGT_CONFIGURATION)
          );
          return initializerFn();
        }  )
      ]
    };
  }
}
