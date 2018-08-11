import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslationOptions } from './translation-options.model';
import { TranslationConfig } from './translation.config';
import { TranslatePipe } from './translate.pipe';
import { TranslationService } from './translation.service';

let options: TranslationOptions;
let defaultTranslations: object;

export function getDefaultTranslations(
  http: HttpClient
): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      http.get( options.translationUrl ).toPromise()
        .then( translations => {
          defaultTranslations = translations;
          resolve();
        } );
    });
  };
}

function translationServiceFactory(
  config: TranslationConfig,
  http: HttpClient
): TranslationService {
  return new TranslationService( config, http );
}

function translationConfigFactory(): TranslationConfig {
  const config = new TranslationConfig();
  config.default = defaultTranslations;
  config.url = options.translationUrl;
  return config;
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
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: getDefaultTranslations,
      multi: true,
      deps: [ HttpClient ]
    },
    {
      provide: TranslationConfig,
      useFactory: translationConfigFactory,
      multi: false
    },
    TranslationService
  ]
})
export class NgTranslationModule {

  static forRoot(
    translationOptions: TranslationOptions
  ): ModuleWithProviders {
    options = translationOptions;
    return {
      ngModule: NgTranslationModule,
      providers: [
        {
          provide: TranslationService,
          useFactory: translationServiceFactory,
          deps: [ TranslationConfig, HttpClient ]
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
          useFactory: translationServiceFactory,
          deps: [ TranslationConfig, HttpClient ]
        }
      ]
    };
  }
}
