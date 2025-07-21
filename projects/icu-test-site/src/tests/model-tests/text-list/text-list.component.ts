/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { NgTranslationModule, TranslationService } from '@logikum/ng-translation';
import { NgtTextList } from '@logikum/ngt-models';

/* locally accessible feature module code, always use a relative path */

@Component( {
  selector: 'icu-text-list',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './text-list.component.html',
  styleUrl: './text-list.component.css'
} )
export class TextListComponent {

  private readonly translation = inject( TranslationService );

  readonly labels = new NgtTextList(
    this.translation,
    { label: 'model.textList.label' }
  );
  readonly texts_1 = new NgtTextList(
    this.translation,
    'enums.season'
  );
  readonly texts_2 = new NgtTextList(
    this.translation,
    [
      'model.textList.advice',
      'model.textList.fruit',
      'app.home.title',
      'app.enums.appStatus'
    ]
  );
  readonly texts_3 = new NgtTextList(
    this.translation,
    {
      advice: 'model.textList.advice',
      fruits: 'model.textList.fruit',
      welcome: 'app.home.title',
      status: 'app.enums.appStatus'
    }
  );
}
