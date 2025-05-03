/* 3rd party libraries */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component({
  selector: 'icu-seasons-menu',
  imports: [
    NgTranslationModule,
    RouterLink
  ],
  templateUrl: './seasons-menu.component.html',
  styleUrl: './seasons-menu.component.css'
})
export class SeasonsMenuComponent {

}
