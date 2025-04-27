/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';
import { NgtTextList } from '@logikum/ng-translatable';

/* locally accessible feature module code, always use a relative path */

@Component({
  selector: 'fts-text-list',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './text-list.component.html',
  styleUrl: './text-list.component.css'
})
export class TextListComponent {

  labels = new NgtTextList({ label: 'model.textList.label' });
  texts_1 = new NgtTextList( 'enums.season' );
  texts_2 = new NgtTextList( [
    'model.textList.advice',
    'model.textList.fruit',
    'app.home.title',
    'app.enums.appStatus'
  ] );
  texts_3 = new NgtTextList( {
    advice: 'model.textList.advice',
    fruits: 'model.textList.fruits',
    welcome: 'app.home.title',
    status: 'app.enums.appStatus'
  } );
}
