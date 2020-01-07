import { NgModule } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { AppService } from '../app/services/app.service';
import { Menu, MenuFactory, SharedModule, VERSION } from '../shared';
import { V20Routing } from './v2-0.routing';
import { pages } from './pages';

@NgModule( {
  imports: [
    SharedModule,
    V20Routing
  ],
  declarations: [
    ...pages
  ]
} )
export class V20Module {

  constructor(
    router: Router,
    svcApp: AppService
  ) {
    const menu: Menu = MenuFactory.create( VERSION.v2_0 );
    svcApp.setMenu( menu );

    router.events.subscribe( event => {
      if (event instanceof NavigationStart && event.url === VERSION.v2_0) {
        svcApp.setMenu( menu );
      }
    } );
  }
}
