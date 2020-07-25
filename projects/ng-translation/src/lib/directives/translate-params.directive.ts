/* 3rd party libraries */
import { Directive, Input } from '@angular/core';

@Directive( {
  // tslint:disable-next-line:directive-selector
  selector: '[translateParams]'
} )
export class TranslateParamsDirective {

  @Input( 'translateParams' ) params: any | undefined;
}
