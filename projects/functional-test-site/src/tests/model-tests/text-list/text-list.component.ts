/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';
import { NgtTextList } from '@logikum/ng-translatable';

/* locally accessible feature module code, always use a relative path */
import { AppService } from '../../../app/app.service';

@Component({
  selector: 'fts-text-list',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './text-list.component.html',
  styleUrl: './text-list.component.css'
})
export class TextListComponent {

  private readonly appService = inject( AppService );

  labels = new NgtTextList(
    this.appService.translation,
    { label: 'model.textList.label' }
  );
  texts_1 = new NgtTextList(
    this.appService.translation,
    'enums.season'
  );
  texts_2 = new NgtTextList(
    this.appService.translation,
    [
      'model.textList.advice',
      'model.textList.fruit',
      'app.home.title',
      'app.enums.appStatus'
    ] );
  texts_3 = new NgtTextList(
    this.appService.translation,
    {
      advice: 'model.textList.advice',
      fruits: 'model.textList.fruits',
      welcome: 'app.home.title',
      status: 'app.enums.appStatus'
    } );
}
