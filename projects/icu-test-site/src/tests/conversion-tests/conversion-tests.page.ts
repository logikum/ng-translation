/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { ContentService } from '../../shared/content.service';
import { AccordionModule } from '../../shared/accordion/accordion.module';
import { CsvFileComponent } from './csv-file/csv-file.component';
import { PoFileComponent } from './po-file/po-file.component';

@Component( {
  selector: 'icu-conversion-tests',
  imports: [
    NgTranslationModule,
    AccordionModule,
    CsvFileComponent,
    PoFileComponent
  ],
  templateUrl: './conversion-tests.page.html',
  styleUrl: './conversion-tests.page.css'
} )
export class ConversionTestsPage {

  private readonly contentService = inject( ContentService );

  constructor() {
    this.contentService.title = 'conversion';
  }
}
