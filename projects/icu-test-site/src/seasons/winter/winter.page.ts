/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { SeasonsMenuComponent } from '../seasons-menu/seasons-menu.component';

@Component({
  selector: 'icu-winter',
  imports: [
    NgTranslationModule,
    SeasonsMenuComponent
  ],
  templateUrl: './winter.page.html',
  styleUrl: './winter.page.css'
})
export class WinterPage {

}
