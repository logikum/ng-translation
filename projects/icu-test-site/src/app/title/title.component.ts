/* 3rd party libraries */
import { Component, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { ContentService } from '../../shared/content.service';

@Component({
  selector: 'icu-title',
  imports: [ RouterLink, NgTranslationModule ],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {

  private contentService = inject(ContentService);

  get title(): Signal<string> { return this.contentService.title; }
}
