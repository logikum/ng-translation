import { Component, Input } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

@Component({
  selector: 'app-no-tag',
  imports: [
    NgTranslationModule
  ],
  template: '<ng-content></ng-content>',
  styles: 'app-no-tag { display: contents; }'
})
export class NoTagComponent {

  // @Input() speed: string;
}
