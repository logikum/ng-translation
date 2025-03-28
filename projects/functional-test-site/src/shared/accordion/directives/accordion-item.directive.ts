/* 3rd party libraries */
import { ContentChild, Directive, Input } from '@angular/core';

/* locally accessible feature module code, always use relative path */
import { AccordionContentDirective } from './accordion-content.directive';
import { AccordionTitleDirective } from './accordion-title.directive';
import { AccordionHeaderDirective } from './accordion-header.directive';

@Directive({
  selector: '[ftsAccordionItem]',
  providers: [
    AccordionContentDirective, AccordionTitleDirective, AccordionHeaderDirective
  ],
})
export class AccordionItemDirective {

  @Input() title = '';
  @Input() disabled = false;
  @ContentChild(AccordionContentDirective) content: AccordionContentDirective;
  @ContentChild(AccordionTitleDirective) customTitle: AccordionTitleDirective;
  @ContentChild(AccordionHeaderDirective) customHeader: AccordionHeaderDirective;
}
