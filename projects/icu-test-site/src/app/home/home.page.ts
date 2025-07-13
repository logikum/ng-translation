/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { ContentService } from '../../shared/content.service';

@Component( {

  selector: 'icu-home',
  imports: [ RouterLink, NgTranslationModule, NgTranslationModule ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
} )
export class HomePage {

  private readonly contentService = inject( ContentService );

  readonly tests = [
    'general', 'seasons', 'translate', 'localize', 'pipe',
    'model', 'null', 'conversion', 'other'
  ];

  constructor() {
    this.contentService.title = '';
  }

  link(
    test: string
  ): string {
    return `/${ test === 'seasons' ? '' : 'tests/' }${ test }`;
  }
}
