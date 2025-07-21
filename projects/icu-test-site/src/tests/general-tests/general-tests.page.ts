/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { ContentService } from '../../shared/content.service';
import { AccordionModule } from '../../shared/accordion/accordion.module';
import { CodeComponent } from './code/code.component';
import { StructuralComponent } from './structural/structural.component';
import { PipeComponent } from './pipe/pipe.component';
import { AttributeComponent } from './attribute/attribute.component';
import { TextObjectComponent } from './text-object/text-object.component';

@Component( {
  selector: 'icu-translation-tests',
  imports: [
    NgTranslationModule,
    AccordionModule,
    CodeComponent,
    StructuralComponent,
    PipeComponent,
    AttributeComponent,
    TextObjectComponent
  ],
  templateUrl: './general-tests.page.html',
  styleUrl: './general-tests.page.css'
} )
export class GeneralTestsPage {

  private readonly contentService = inject( ContentService );

  constructor() {
    this.contentService.title = 'general';
  }
}
