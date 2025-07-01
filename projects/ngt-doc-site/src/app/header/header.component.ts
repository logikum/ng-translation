/* 3rd party libraries */
import { Component, inject } from '@angular/core';

/* locally accessible feature module code, always use a relative path */
import { AppService } from '../app.service';
import { Chapter } from '../content-change.event';
import { TopMenuItem } from './top-menu-item.model';
import * as topMenu from './top-menu.json';

@Component({
  selector: 'doc-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private appService = inject(AppService);

  chapters = (topMenu as any).default as Array<TopMenuItem>;

  getSelected(
    chapter: Chapter
  ): string {
    return chapter === this.appService.chapter ? 'selected' : '';
  }

  selectChapter(
    chapter: TopMenuItem
  ): void {
    if (this.appService.chapter !== chapter.id) {
      this.appService.setChapter(chapter.id, chapter.text);
    }
  }
}
