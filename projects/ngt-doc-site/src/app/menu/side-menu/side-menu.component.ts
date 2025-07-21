/* 3rd party libraries */
import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

/* locally accessible feature module code, always use a relative path */
import { AppService } from '../../app.service';
import { SideMenuItem } from '../side-menu-item.model';

@Component({
  selector: 'doc-side-menu',
  imports: [
    AsyncPipe, NgIf
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  private readonly appService = inject(AppService);

  @Input() items$: Observable<Array<SideMenuItem>>;
  @Input() level = 0;

  protected readonly of = of;

  selected(
    id: string
  ): string {
    return this.appService.content === id ? 'selected' : '';
  }

  loadContent(
    content: string,
  ): void {
    this.appService.setContent(content);
  }
}
