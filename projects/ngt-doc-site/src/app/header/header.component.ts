/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';

/* locally accessible feature module code, always use a relative path */
import { AppService } from '../app.service';
import { Chapter } from '../content-change.event';
import { TopMenuItem } from './top-menu-item.model';
import * as topMenu from './top-menu.json';
import { NgOptimizedImage } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'doc-header',
  imports: [ OverlayModule, NgOptimizedImage, MenuComponent ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private readonly appService = inject(AppService);

  chapters = (topMenu as any).default as Array<TopMenuItem>;
  isOpen = false;

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

  close(): void {
    this.isOpen = false;
  }
}
