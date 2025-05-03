/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { SeasonsMenuComponent } from '../seasons-menu/seasons-menu.component';

@Component({
  selector: 'icu-spring',
  imports: [
    NgTranslationModule,
    SeasonsMenuComponent
  ],
  templateUrl: './spring.page.html',
  styleUrl: './spring.page.css'
})
export class SpringPage {

}
