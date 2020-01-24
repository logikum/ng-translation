import { NgModule } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { AppService } from '../app/services/app.service';
import { Menu, MenuFactory, SharedModule, VERSION } from '../shared';
import { V10Routing } from './v1-0.routing';
import { pages } from './pages';

@NgModule( {
  imports: [
    SharedModule,
    V10Routing
  ],
  declarations: [
    ...pages
  ],
  providers: []
} )
export class V10Module {

  constructor(
    router: Router,
    svcApp: AppService
  ) {
    const menu: Array<Menu> = MenuFactory.create( VERSION.v1_0 );
    svcApp.setMenu( menu );

    router.events.subscribe( event => {
      if (event instanceof NavigationStart && event.url === VERSION.v1_0) {
        svcApp.setMenu( menu );
      }
    } );
  }
}
