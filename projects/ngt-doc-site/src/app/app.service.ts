/* 3rd party libraries */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/* locally accessible feature module code, always use a relative path */
import { ContentChangeEvent } from './content-change.event';
import { Chapter } from './data/chapter.type';
import { SideMenuItem } from './data/side-menu-item.model';
import { TopMenuItem } from './data/top-menu-item.model';
import * as topMenu from './data/top-menu.json';
import * as documentation from './data/chapters/documentation.json';
import * as ngtFormatter from './data/chapters/ngt-formatter.json';
import * as icuFormatter from './data/chapters/icu-formatter.json';
import * as textObject from './data/chapters/text-object.json';
import * as api from './data/chapters/api.json';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly changeSubject: BehaviorSubject<ContentChangeEvent>;
  private readonly itemsSubject = new BehaviorSubject<Array<SideMenuItem>>([]);

  chapters = (topMenu as any).default as Array<TopMenuItem>;
  chapter: Chapter = 'home';
  title = '';
  page = '/';

  get items$(): Observable<Array<SideMenuItem>> {
    return this.itemsSubject.asObservable();
  }

  get contentChange$(): Observable<ContentChangeEvent> {
    return this.changeSubject.asObservable();
  }

  constructor() {

    this.changeSubject = new BehaviorSubject<ContentChangeEvent>({
      chapter: this.chapter,
      page: this.page
    });
  }

  setChapter(
    chapter: Chapter
  ): void {

    if (this.chapter !== chapter) {
      this.chapter = chapter;
      this.title = this.chapters.find(item => item.id === chapter)?.text;
      this.page = '';

      // Select the required side menu if any.
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
        case 'text-object':
          this.itemsSubject.next( (textObject as any).default as Array<SideMenuItem> );
          break;
        case 'api':
          this.itemsSubject.next( (api as any).default as Array<SideMenuItem> );
          break;
        default:
          this.itemsSubject.next( [] );
          hasMenu = false;
          break;
      }
      this.page = hasMenu ? this.itemsSubject.value[ 0 ].id  : '/';
      this.sendNotification();
    }
  }

  setPage(
    page: string
  ): void {

    if (this.page !== page) {
      this.page = page;
      this.sendNotification();
    }
  }

  private sendNotification(): void {

    this.changeSubject.next({
      chapter: this.chapter,
      page: this.page
    });
  }
}
