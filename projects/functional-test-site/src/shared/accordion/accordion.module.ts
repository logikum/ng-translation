/* 3rd party libraries */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

/* locally accessible feature module code, always use relative path */
import { AccordionComponent } from './accordion.component';
import { AccordionItemDirective } from './directives/accordion-item.directive';
import { AccordionContentDirective } from './directives/accordion-content.directive';
import { AccordionTitleDirective } from './directives/accordion-title.directive';
import { AccordionHeaderDirective } from './directives/accordion-header.directive';

@NgModule({
  imports: [
    CommonModule,
    AccordionComponent,
    AccordionItemDirective,
    AccordionContentDirective,
    AccordionTitleDirective,
    AccordionHeaderDirective
  ],
  exports: [
    AccordionComponent,
    AccordionItemDirective,
    AccordionContentDirective,
    AccordionTitleDirective,
    AccordionHeaderDirective
  ]
})
export class AccordionModule {}
