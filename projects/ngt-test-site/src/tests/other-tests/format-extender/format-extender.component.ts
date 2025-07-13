/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component( {
  selector: 'nts-format-extender',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './format-extender.component.html',
  styleUrl: './format-extender.component.css'
} )
export class FormatExtenderComponent {

  readonly format = '{{0|roman}}';
  readonly ones: Array<number> = [];
  readonly tens: Array<number> = [];
  readonly hundreds: Array<number> = [];
  readonly randoms: Array<number> = [];

  constructor() {

    for (let i = 1; i <= 10; i++) {
      this.ones.push( i );
      this.tens.push( i * 10 );
      this.hundreds.push( i * 100 );
      this.randoms.push( Math.floor( Math.random() * 3399 ) + 1 );
    }
  }

  separator(
    i: number
  ): string {
    return i < 9 ? ', ' : '';
  }
}
