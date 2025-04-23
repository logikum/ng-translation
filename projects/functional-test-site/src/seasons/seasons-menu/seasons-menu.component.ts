/* 3rd party libraries */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-seasons-menu',
  imports: [
    NgTranslationModule,
    RouterLink
  ],
  templateUrl: './seasons-menu.component.html',
  styleUrl: './seasons-menu.component.css'
})
export class SeasonsMenuComponent {

}
