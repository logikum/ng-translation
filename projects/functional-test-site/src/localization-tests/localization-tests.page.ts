/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use relative path */
import { ContentService } from '../shared/content.service';
import { AccordionModule } from '../shared/accordion/accordion.module';
import { NumberFormatComponent } from './number-format/number-format.component';
import { PercentFormatComponent } from './percent-format/percent-format.component';
import { CurrencyFormatComponent } from './currency-format/currency-format.component';
import { DatetimeFormatComponent } from './datetime-format/datetime-format.component';
import { PluralFormatComponent } from './plural-format/plural-format.component';
import { LocalizationComponent } from './localization/localization.component';

@Component({
  selector: 'fun-localization-tests',
  imports: [
    NgTranslationModule,
    AccordionModule,
    NumberFormatComponent,
    PercentFormatComponent,
    CurrencyFormatComponent,
    DatetimeFormatComponent,
    PluralFormatComponent,
    LocalizationComponent
  ],
  templateUrl: './localization-tests.page.html',
  styleUrl: './localization-tests.page.css'
})
export class LocalizationTestsPage {

  private contentService = inject(ContentService);

  constructor() {
    this.contentService.title = 'localization';
  }
}
