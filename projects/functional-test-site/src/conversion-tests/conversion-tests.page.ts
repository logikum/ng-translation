/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { ContentService } from '../shared/content.service';
import { AccordionModule } from '../shared/accordion/accordion.module';
import { PoFileComponent } from './po-file/po-file.component';

@Component({
  selector: 'fts-conversion-tests',
  imports: [
    NgTranslationModule,
    AccordionModule,
    PoFileComponent
  ],
  templateUrl: './conversion-tests.page.html',
  styleUrl: './conversion-tests.page.css'
})
export class ConversionTestsPage {

  private contentService = inject(ContentService);

  constructor() {
    this.contentService.title = 'conversion';
  }
}
