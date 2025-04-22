/* 3rd party libraries */
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use relative path */
import { ContentService } from '../../shared/content.service';

const tests = [
  'component', 'translation', 'localization', 'conversion', 'null', 'other'
];

@Component({

  selector: 'fts-home',
  imports: [ RouterLink, NgTranslationModule, NgTranslationModule ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export class HomePage {

  private contentService = inject(ContentService);

  // tests = signal(tests);
  tests = [
    'translation', 'localization', 'localize', 'pipe',
    'model', 'null', 'conversion', 'other'
  ];

  constructor() {
    this.contentService.title = '';
  }

  // key(test: string): string { return `app.${test}`; }
}
