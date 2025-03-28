/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-interpolation',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './interpolation.component.html',
  styleUrl: './interpolation.component.css'
})
export class InterpolationComponent {

}
