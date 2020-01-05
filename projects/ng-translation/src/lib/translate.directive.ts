import {
  Directive, Input, OnChanges, OnInit, Optional, SimpleChanges, TemplateRef, ViewContainerRef
} from '@angular/core';

import { TranslationService } from './translation.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[translate]'
})
export class TranslateDirective implements OnInit, OnChanges {

  @Input('translate') key: string | undefined;
  @Input('translateParams') params: any | undefined;
  @Input('translateNode') node: string | undefined;

  constructor(
    private container: ViewContainerRef,
    @Optional() private template: TemplateRef<{ $implicit: (key: string, params?: any) => any }>,
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

    if (this.key) {
      // Attribute directive.
      this.container.element.nativeElement.innerText = this.translate.get( this.key, this.params );
    } else {
      // Structural directive.
      const service = this.translate;
      const context = {
        keyRoot: this.node,
        $implicit: function (
          key: string,
          args?: any
        ): string {
          if (this.keyRoot) {
            if (key.startsWith( '/' )) {
              return service.get( key.substr( 1 ), args );
            } else {
              return service.get( `${ this.keyRoot }.${ key }`, args );
            }
          } else {
            if (key.startsWith( '/' )) {
              return service.get( key.substr( 1 ), args );
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
}
