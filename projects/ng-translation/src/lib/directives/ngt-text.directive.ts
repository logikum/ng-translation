/* 3rd party libraries */
import { Directive, Input, OnInit } from '@angular/core';

/* locally accessible feature module code, always use a relative path */
import { NgtDirectiveBase } from './ngt-directive-base';

@Directive( {
  selector: '[ngtText]',
  standalone: false
} )
export class NgtTextDirective extends NgtDirectiveBase implements OnInit {

  isHtml = false;

  @Input( 'ngtText' )
  set key( value: string ) {
    this.setKeyValue( value );
  }

  @Input( 'ngtParams' )
  set params( value: any ) {
    this.setParamsValue( value );
  }

  ngOnInit(): void {
    this.initialize();
  }
}
