/* 3rd party libraries */
import { Directive, Input } from '@angular/core';

/* locally accessible feature module code, always use relative path */
import { NgtDirectiveBase } from './ngt-directive-base';

@Directive( {
  selector: '[ngtText]',
  standalone: false
} )
export class NgtTextDirective extends NgtDirectiveBase {

  isHtml = false;

  @Input( 'ngtText' )
  set key( value: string ) {
    this.setKeyValue( value );
  }

  @Input( 'ngtParams' )
  set params( value: any | undefined ) {
    this.setParamsValue( value );
  }
}
