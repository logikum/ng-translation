/* 3rd party libraries */
import { Directive, TemplateRef } from '@angular/core';

/* locally accessible feature module code, always use relative path */

@Directive({
  selector: '[ftsAccordionHeader]'
})
export class AccordionHeaderDirective {

  constructor(
    public templateRef: TemplateRef<any>
  ) { }
}
