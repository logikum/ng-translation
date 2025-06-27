/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { SeasonsMenuComponent } from '../seasons-menu/seasons-menu.component';

@Component({
  selector: 'nts-summer',
  imports: [
    NgTranslationModule,
    SeasonsMenuComponent
  ],
  templateUrl: './summer.page.html',
  styleUrl: './summer.page.css'
})
export class SummerPage {

}
