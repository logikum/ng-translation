/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

/* locally accessible feature module code, always use a relative path */
import { AppService } from '../app.service';
import { SideMenuItem } from './side-menu-item.model';
import { SideMenuComponent } from './side-menu/side-menu.component';

@Component({
  selector: 'doc-menu',
  imports: [
    SideMenuComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {

  private readonly appService = inject(AppService);

  get title(): string {
    return this.appService.title;
  }

  get items$(): Observable<Array<SideMenuItem>> {
    return this.appService.items$;
  }
}
