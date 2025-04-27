/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use a relative path */
import { ContentService } from '../../shared/content.service';
import { AccordionModule } from '../../shared/accordion/accordion.module';
import { NumberFormatComponent } from './number-format/number-format.component';
import { PercentFormatComponent } from './percent-format/percent-format.component';
import { CurrencyFormatComponent } from './currency-format/currency-format.component';
import { MoneyFormatComponent } from './money-format/money-format.component';
import { DatetimeFormatComponent } from './datetime-format/datetime-format.component';

@Component({
  selector: 'fts-localize-tests',
  imports: [
    NgTranslationModule,
    AccordionModule,
    NumberFormatComponent,
    PercentFormatComponent,
    CurrencyFormatComponent,
    MoneyFormatComponent,
    DatetimeFormatComponent
  ],
  templateUrl: './localize-tests.page.html',
  styleUrl: './localize-tests.page.css'
})
export class LocalizeTestsPage {

  private contentService = inject(ContentService);

  constructor() {
    this.contentService.title = 'localize';
  }
}
