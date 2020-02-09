import {
  Directive, Input, OnChanges, OnInit, Optional, SimpleChanges,
  TemplateRef, ViewContainerRef
} from '@angular/core';

import { TranslationService } from '../services';

interface ViewContext {
  $implicit: (key: string, params?: any) => any;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[translate]'
})
export class TranslateDirective implements OnInit, OnChanges {

  @Input('translate') key: string | undefined;
  @Input('translateParams') params: any | undefined;
  @Input('translateNode') node: string | undefined;

  constructor(
    private readonly container: ViewContainerRef,
    @Optional() private template: TemplateRef<ViewContext>,
    private readonly translate: TranslationService
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
      const keyRoot = this.node;
      const context = {
        $implicit: function (
          key: string,
          args?: any
        ): string {
          if (keyRoot) {
            if (key.startsWith( '/' )) {
              return service.get( key.substr( 1 ), args );
            } else {
              return service.get( `${ keyRoot }.${ key }`, args );
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
