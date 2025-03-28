import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';
import { NoTagComponent } from './no-tag.component';

@Component({
  selector: 'app-camel-case',
  imports: [
    NgTranslationModule,
    NoTagComponent
  ],
  templateUrl: './camel-case.component.html',
  styleUrl: './camel-case.component.css'
})
export class CamelCaseComponent {

}
