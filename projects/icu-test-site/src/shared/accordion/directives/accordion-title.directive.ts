/* 3rd party libraries */
import { Directive, TemplateRef } from '@angular/core';

/* locally accessible feature module code, always use a relative path */

@Directive( {
  selector: '[ftsAccordionTitle]'
} )
export class AccordionTitleDirective {

  constructor(
    public templateRef: TemplateRef<any>
  ) { }
}
