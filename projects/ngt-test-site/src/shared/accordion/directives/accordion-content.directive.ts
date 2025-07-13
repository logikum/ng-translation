/* 3rd party libraries */
import { Directive, TemplateRef } from '@angular/core';

/* locally accessible feature module code, always use a relative path */

@Directive( {
  selector: '[ftsAccordionContent]'
} )
export class AccordionContentDirective {

  constructor(
    public templateRef: TemplateRef<any>
  ) { }
}
