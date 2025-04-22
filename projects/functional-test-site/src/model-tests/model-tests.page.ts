/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use relative path */
import { ContentService } from '../shared/content.service';
import { AccordionModule } from '../shared/accordion/accordion.module';
import { TextListComponent } from './text-list/text-list.component';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';
import { SingleChoiceComponent } from './single-choice/single-choice.component';
import { LocaleListComponent } from './locale-list/locale-list.component';

@Component({
  selector: 'fts-model-tests',
  imports: [
    NgTranslationModule,
    AccordionModule,
    TextListComponent,
    MultipleChoiceComponent,
    SingleChoiceComponent,
    LocaleListComponent
  ],
  templateUrl: './model-tests.page.html',
  styleUrl: './model-tests.page.css'
})
export class ModelTestsPage {

  private contentService = inject(ContentService);

  constructor() {
    this.contentService.title = 'model';
  }
}
