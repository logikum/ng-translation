/* 3rd party libraries */
import { Directive, Input } from '@angular/core';

/* locally accessible feature module code, always use a relative path */

@Directive( {
  selector: '[ngtParams]',
  standalone: false
} )
export class NgtParamsDirective {

  @Input( 'ngtParams' ) params: any;
}
