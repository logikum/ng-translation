/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/* locally accessible feature module code, always use a relative path */
import { AppService } from '../app.service';
import { Chapter } from '../content-change.event';
import { SideMenuItem } from './side-menu-item.model';
import { SideMenuComponent } from './side-menu/side-menu.component';
import * as documentation from './chapters/documentation.json';
import * as ngtFormatter from './chapters/ngt-formatter.json';
import * as icuFormatter from './chapters/icu-formatter.json';
import * as api from './chapters/api.json';

@Component({
  selector: 'doc-menu',
  imports: [
    SideMenuComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {

  private appService = inject(AppService);
  private itemsSubject = new BehaviorSubject<Array<SideMenuItem>>([]);
  private currentChapter = '';

  get title(): string {
    return this.appService.title;
  }
  get items$(): Observable<Array<SideMenuItem>> {
    return this.itemsSubject.asObservable();
  }

  constructor() {
    this.appService.contentChange$
      .pipe(takeUntilDestroyed())
      .subscribe(contentChange => {
        this.changeMenu(contentChange.chapter);
      });
  }

  private changeMenu(
    chapter: Chapter
  ): void {

    if (this.currentChapter !== chapter) {
      // Clear current content.
      this.selectContent( '' );

      // Build the required menu if any.
      let hasMenu = true;
      switch (chapter) {
        case 'documentation':
          this.itemsSubject.next( (documentation as any).default as Array<SideMenuItem> );
          break;
        case 'ngt-formatter':
          this.itemsSubject.next( (ngtFormatter as any).default as Array<SideMenuItem> );
          break;
        case 'icu-formatter':
          this.itemsSubject.next( (icuFormatter as any).default as Array<SideMenuItem> );
          break;
        case 'api':
          this.itemsSubject.next( (api as any).default as Array<SideMenuItem> );
          break;
        default:
          this.itemsSubject.next( [] );
          hasMenu = false;
          break;
      }

      // Set new content.
      setTimeout(() => {
        this.selectContent( hasMenu ? this.itemsSubject.value[ 0 ].id  : '/' );
      }, 200);
      this.currentChapter = chapter;
    }
  }

  private selectContent(
    content: string
  ): void {
    if (this.appService.content !== content) {
      this.appService.setContent(content);
    }
  }
}
