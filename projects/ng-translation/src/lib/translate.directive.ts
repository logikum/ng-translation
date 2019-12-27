import {
  Directive, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewContainerRef
} from '@angular/core';

import { TranslationService } from './translation.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[translate]'
})
export class TranslateDirective implements OnInit, OnChanges {

  private context: any;

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>,
    private translate: TranslationService
  ) {
    this.context = {
      $implicit: function (
        key: string,
        args?: any
      ): string {
        return translate.get( key, args );
      }
    };
  }

  ngOnInit(): void {
    this.container.createEmbeddedView( this.template, this.context );
  }

  ngOnChanges(
    changes: SimpleChanges
  ): void {
    this.container.clear();
    this.container.createEmbeddedView( this.template, this.context );
  }
}
