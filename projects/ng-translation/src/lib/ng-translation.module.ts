import { APP_INITIALIZER, NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslationConfig } from './translation-config.model';
import { TranslatePipe } from './translate.pipe';
import { TranslationService } from './translation.service';
import { TranslateDirective } from './translate.directive';
import { TranslateParamsDirective } from './translate-params.directive';
import { TranspilerService } from './transpiler.service';

export function initializerFactory(
  service: TranslationService,
  config: TranslationConfig
): () => void {

  function initializer() {
    service.initializeApp( config )
      .then( browserLanguageSupported => {
        service.changeLanguage(
          browserLanguageSupported ?
            navigator.language :
            config.defaultLanguage
        );
      } );
  }
  return initializer;
}

export function serviceFactory(
  http: HttpClient
): TranslationService {

  return new TranslationService( http, new TranspilerService() );
}

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

  static forChild(): ModuleWithProviders<NgTranslationModule> {
    return {
      ngModule: NgTranslationModule,
      providers: [ ]
    };
  }
}
