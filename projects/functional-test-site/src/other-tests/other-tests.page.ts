/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use relative path */
import { ContentService } from '../shared/content.service';
import { AccordionModule } from '../shared/accordion/accordion.module';
import { CamelCaseComponent } from './camel-case/camel-case.component';
import { TranspileExtenderComponent } from './transpile-extender/transpile-extender.component';
import { EnumerationComponent } from './enumeration/enumeration.component';

@Component({
  selector: 'fts-other-tests',
  imports: [
    NgTranslationModule,
    AccordionModule,
    CamelCaseComponent,
    TranspileExtenderComponent,
    EnumerationComponent
  ],
  templateUrl: './other-tests.page.html',
  styleUrl: './other-tests.page.css'
})
export class OtherTestsPage {

  private contentService = inject(ContentService);

  constructor() {
    this.contentService.title = 'other';
  }
}
