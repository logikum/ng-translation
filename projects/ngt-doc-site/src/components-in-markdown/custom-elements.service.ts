import { inject, Injectable, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { CounterComponent } from './counter/counter.component';

@Injectable({ providedIn: 'root' })
export class CustomElementsService {
  private _injector = inject(Injector);

  setupCustomElements() {
    const subscribeElement = createCustomElement(SubscribeComponent, {
      injector: this._injector,
    });
    customElements.define('subscribe-component', subscribeElement);

    const counterElement = createCustomElement(CounterComponent, {
      injector: this._injector,
    });
    customElements.define('counter-component', counterElement);
  }
}
