/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use relative path */
import { SeasonsMenuComponent } from '../seasons-menu/seasons-menu.component';

@Component({
  selector: 'fts-summer',
  imports: [
    NgTranslationModule,
    SeasonsMenuComponent
  ],
  templateUrl: './summer.page.html',
  styleUrl: './summer.page.css'
})
export class SummerPage {

}
