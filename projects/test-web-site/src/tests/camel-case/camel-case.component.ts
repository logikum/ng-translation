import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

@Component({
  selector: 'app-camel-case',
  standalone: true,
  imports: [
    NgTranslationModule
  ],
  templateUrl: './camel-case.component.html',
  styleUrl: './camel-case.component.css'
})
export class CamelCaseComponent {

}
