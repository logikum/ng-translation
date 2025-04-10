/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use relative path */
import { ContentService } from '../shared/content.service';
import { AccordionModule } from '../shared/accordion/accordion.module';
import { TextComponent } from './text/text.component';
import { InterpolationComponent } from './interpolation/interpolation.component';
import { StructuralComponent } from './structural/structural.component';
import { PipeComponent } from './pipe/pipe.component';
import { AttributeComponent } from './attribute/attribute.component';
import { HtmlComponent } from './html/html.component';

@Component({
  selector: 'fun-translation-tests',
  imports: [
    NgTranslationModule,
    AccordionModule,
    TextComponent,
    InterpolationComponent,
    StructuralComponent,
    PipeComponent,
    AttributeComponent,
    HtmlComponent
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
