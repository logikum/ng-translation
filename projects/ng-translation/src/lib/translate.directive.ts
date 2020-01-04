import {
  Directive, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewContainerRef
} from '@angular/core';

import { TranslationService } from './translation.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[translate]'
})
export class TranslateDirective implements OnInit, OnChanges {

  // @Input('translate') key: string;
  @Input('translateNode') inlineNode: string | undefined;

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>,
    private translate: TranslationService
  ) { }

  ngOnInit(): void {
    this.initialize();
  }

  ngOnChanges(
    changes: SimpleChanges
  ): void {
    const isUpdate = Object.keys(changes).some(p => changes[p].firstChange === false);
    if (isUpdate) {
      this.initialize();
    }
  }

  private initialize(): void {

    const service = this.translate;
    const context = {
      node: this.inlineNode,
      $implicit: function (
        key: string,
        args?: any
      ): string {
        if (this.node) {
          if (key.startsWith('/')) {
            return service.get( key.substr(1), args );
          } else {
            return service.get( `${ this.node }.${ key }`, args );
          }
        } else {
          if (key.startsWith('/')) {
            return service.get( key.substr(1), args );
          } else {
            return service.get( key, args );
          }
        }
      }
    };
    this.container.clear();
    this.container.createEmbeddedView( this.template, context );
  }
}
