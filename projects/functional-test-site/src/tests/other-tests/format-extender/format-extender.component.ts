/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component({
  selector: 'fts-format-extender',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './format-extender.component.html',
  styleUrl: './format-extender.component.css'
})
export class FormatExtenderComponent {

  readonly format = '{{0|roman}}';
  ones: Array<number> = [];
  tens: Array<number> = [];
  hundreds: Array<number> = [];
  randoms: Array<number> = [];

  constructor() {

    for (let i = 1; i <= 10; i++) {
      this.ones.push(i);
      this.tens.push(i * 10);
      this.hundreds.push(i * 100);
      this.randoms.push( Math.floor( Math.random() * 3399) + 1 );
    }
  }

  separator(
    i: number
  ): string {
    return i < 9 ? ', ' : '';
  }
}
