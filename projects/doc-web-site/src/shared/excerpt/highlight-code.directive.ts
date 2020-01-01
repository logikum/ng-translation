import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import * as hljs from 'highlight.js';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'code[highlight]'
})
export class HighlightCodeDirective implements AfterViewInit{

  constructor(
    private eltRef: ElementRef
  ) { }

  ngAfterViewInit() {
    hljs.highlightBlock( this.eltRef.nativeElement );
  }
}
