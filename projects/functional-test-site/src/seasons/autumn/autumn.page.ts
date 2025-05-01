/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { SeasonsMenuComponent } from '../seasons-menu/seasons-menu.component';

@Component({
  selector: 'fts-fall',
  imports: [
    NgTranslationModule,
    SeasonsMenuComponent
  ],
  templateUrl: './autumn.page.html',
  styleUrl: './autumn.page.css'
})
export class AutumnPage {

}
