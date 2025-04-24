/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { ContentService } from '../shared/content.service';
import { AccordionModule } from '../shared/accordion/accordion.module';
import { CodeComponent } from './code/code.component';
import { StructuralComponent } from './structural/structural.component';
import { PipeComponent } from './pipe/pipe.component';
import { AttributeComponent } from './attribute/attribute.component';
import { ReaderComponent } from './reader/reader.component';

@Component({
  selector: 'fts-translation-tests',
  imports: [
    NgTranslationModule,
    AccordionModule,
    CodeComponent,
    StructuralComponent,
    PipeComponent,
    AttributeComponent,
    ReaderComponent
  ],
  templateUrl: './translation-tests.page.html',
  styleUrl: './translation-tests.page.css'
})
export class TranslationTestsPage {

  private contentService = inject(ContentService);

  constructor() {
    this.contentService.title = 'translation';
  }
}
