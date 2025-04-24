/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { ContentService } from '../shared/content.service';
import { AccordionModule } from '../shared/accordion/accordion.module';
import { ToNumberComponent } from './to-number/to-number.component';
import { ToPercentComponent } from './to-percent/to-percent.component';
import { ToCurrencyComponent } from './to-currency/to-currency.component';
import { ToMoneyComponent } from './to-money/to-money.component';
import { ToDatetimeComponent } from './to-datetime/to-datetime.component';

@Component({
  selector: 'fts-pipe-tests',
  imports: [
    NgTranslationModule,
    AccordionModule,
    ToNumberComponent,
    ToPercentComponent,
    ToCurrencyComponent,
    ToMoneyComponent,
    ToDatetimeComponent,
  ],
  templateUrl: './pipe-tests.page.html',
  styleUrl: './pipe-tests.page.css'
})
export class PipeTestsPage {

  private contentService = inject(ContentService);

  constructor() {
    this.contentService.title = 'pipe';
  }
}
