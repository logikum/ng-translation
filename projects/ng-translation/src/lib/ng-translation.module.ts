/* 3rd party libraries */
import { NgModule, ModuleWithProviders, inject, provideAppInitializer } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

/* locally accessible feature module code, always use relative path */
import {
  NgtContextDirective, NgtHtmlDirective, NgtParamsDirective, NgtReaderDirective,
  NgtTextDirective,
} from './directives';
import {
  NGT_TRANSLATION_CONVERTER, NGT_FORMAT_EXTENDER, NGT_CONFIGURATION,
  NGT_INLINE_LOADER, TranslationConfig
} from './models';
import {
  ToCcyPipe, ToCurrencyPipe, ToDatetimePipe, ToNumberPipe, ToPercentPipe, TranslatePipe
} from './pipes';
import { TranslationService } from './services';
import { initializerFactory } from './initializer.factory';
import { DefaultTranslationConverter } from './default-translation.converter';
import { DefaultFormatExtender } from './default-format.extender';

@NgModule( {
  declarations: [
    ToCcyPipe,
    ToCurrencyPipe,
    ToDatetimePipe,
    ToNumberPipe,
    ToPercentPipe,
    TranslatePipe,
    NgtContextDirective,
    NgtHtmlDirective,
    NgtParamsDirective,
    NgtReaderDirective,
    NgtTextDirective
  ],
  exports: [
    ToCcyPipe,
    ToCurrencyPipe,
    ToDatetimePipe,
    ToNumberPipe,
    ToPercentPipe,
    TranslatePipe,
    NgtContextDirective,
    NgtHtmlDirective,
    NgtParamsDirective,
    NgtReaderDirective,
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
        provideAppInitializer(() => {
          const initializerFn = initializerFactory(
            inject(TranslationService), inject(NGT_CONFIGURATION)
          );
          return initializerFn();
        })
      ]
    };
  }
}
