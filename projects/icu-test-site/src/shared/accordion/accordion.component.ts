/* 3rd party libraries */
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

/* locally accessible feature module code, always use a relative path */
import { AccordionItemDirective } from './directives/accordion-item.directive';

@Component({
  selector: 'icu-accordion',
  imports: [ NgTemplateOutlet ],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css',
  animations: [
    trigger('contentExpansion', [
      state('expanded', style({height: '*', opacity: 1, visibility: 'visible'})),
      state('collapsed', style({height: '0px', opacity: 0, visibility: 'hidden'})),
      transition('expanded <=> collapsed',
        animate('200ms cubic-bezier(.37,1.04,.68,.98)')),
    ])
  ]
})
export class AccordionComponent implements AfterContentInit {

  expanded = new Set<number>();
  /**
   * Decides if the single item will be open at once or not.
   * In collapsing mode, toggling one would collapse others
   */
  @Input() collapsing = true;

  @ContentChildren(AccordionItemDirective) items: QueryList<AccordionItemDirective>;

  ngAfterContentInit(): void {
    this.toggleState(0);
  }

  /**
   * Make the toggle function available to be called from outside.
   * @param index - Index of the accordion item
   */
  getToggleState = (index: number) => {
    return this.toggleState.bind(this, index);
  }

  toggleState = (index: number) => {
    if (this.expanded.has(index)) {
      this.expanded.delete(index);
    } else {
      if (this.collapsing) {
        this.expanded.clear();
      }
      this.expanded.add(index);
    }
  }
}
