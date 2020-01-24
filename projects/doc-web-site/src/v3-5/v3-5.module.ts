import { NgModule } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { AppService } from '../app/services/app.service';
import { Menu, MenuFactory, SharedModule, VERSION } from '../shared';
import { V35Routing } from './v3-5.routing';
import { pages } from './pages';

@NgModule({
  imports: [
    SharedModule,
    V35Routing
  ],
  declarations: [
    ...pages
  ]
})
export class V35Module {

  constructor(
    router: Router,
    svcApp: AppService
  ) {
    const menu: Array<Menu> = MenuFactory.create( VERSION.v3_5 );
    svcApp.setMenu( menu );

    router.events.subscribe( event => {
      if (event instanceof NavigationStart && event.url === VERSION.v3_5) {
        svcApp.setMenu( menu );
      }
    } );
  }
}
