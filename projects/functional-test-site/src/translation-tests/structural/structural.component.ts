/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-structural',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './structural.component.html',
  styleUrl: './structural.component.css'
})
export class StructuralComponent {

}
