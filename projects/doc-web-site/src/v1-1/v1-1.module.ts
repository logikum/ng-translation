import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NavigationStart, Router, RouterModule, Routes } from '@angular/router';

import { Menu, MENU, PATH, VERSION } from '../shared';
import { AppService } from '../app/services/app.service';

import { SetupComponent } from './setup/setup.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { UsageComponent } from './usage/usage.component';
import { SelectionListComponent } from './selection-list/selection-list.component';
import { TextListComponent } from './text-list/text-list.component';
import { ApiComponent } from './api/api.component';

const routes: Routes = [
  { path: '', redirectTo: 'setup', pathMatch: 'full' },
  { path: PATH.setup, component: SetupComponent },
  { path: PATH.configuration, component: ConfigurationComponent },
  { path: PATH.usage, component: UsageComponent },
  { path: PATH.selectionList, component: SelectionListComponent },
  { path: PATH.textList, component: TextListComponent },
  { path: PATH.api, component: ApiComponent }
];

@NgModule( {
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    SetupComponent,
    ConfigurationComponent,
    UsageComponent,
    SelectionListComponent,
    TextListComponent,
    ApiComponent
  ],
  providers: []
} )
export class V11Module {

  constructor(
    router: Router,
    svcApp: AppService
  ) {
    const menu: Menu = new Menu( VERSION.v1_1 );

    menu.add( PATH.setup, MENU.setup );
    menu.add( PATH.configuration, MENU.configuration );
    menu.add( PATH.usage, MENU.usage );
    menu.add( PATH.selectionList, MENU.selectionList );
    menu.add( PATH.textList, MENU.textList );
    menu.add( PATH.api, MENU.api );

    svcApp.setMenu( menu );

    router.events.subscribe( event => {
      if (event instanceof NavigationStart && event.url === VERSION.v1_1) {
        svcApp.setMenu( menu );
      }
    } );
  }
}
