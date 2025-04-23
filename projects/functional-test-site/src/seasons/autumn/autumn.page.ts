/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use relative path */
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
