/* 3rd party libraries */
import { Directive, Input } from '@angular/core';

/* locally accessible feature module code, always use a relative path */
import { NgtDirectiveBase } from './ngt-directive-base';

@Directive( {
  selector: '[ngtHtml]',
  standalone: false
} )
export class NgtHtmlDirective extends NgtDirectiveBase {

  isHtml = true;

  @Input( 'ngtHtml' )
  set key( value: string ) {
    this.setKeyValue( value );
  }

  @Input( 'ngt-params' )
  set params( value: any | undefined ) {
    this.setParamsValue( value );
  }
}
