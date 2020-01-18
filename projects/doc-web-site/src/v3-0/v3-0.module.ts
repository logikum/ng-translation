import { NgModule } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { AppService } from '../app/services/app.service';
import { Menu, MenuFactory, SharedModule, VERSION } from '../shared';
import { V30Routing } from './v3-0.routing';
import { pages } from './pages';

@NgModule({
  imports: [
    SharedModule,
    V30Routing
  ],
  declarations: [
    ...pages
  ]
})
export class V30Module {

  constructor(
    router: Router,
    svcApp: AppService
  ) {
    const menu: Array<Menu> = MenuFactory.create( VERSION.v3_0 );
    svcApp.setMenu( menu );

    router.events.subscribe( event => {
      if (event instanceof NavigationStart && event.url === VERSION.v3_0) {
        svcApp.setMenu( menu );
      }
    } );
  }
}
