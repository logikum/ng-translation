/* 3rd party libraries */
import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

/* locally accessible feature module code, always use a relative path */
import { AppService } from '../app.service';
import { Chapter } from '../content-change.event';
import { TopMenuItem } from '../data/top-menu-item.model';
import { MenuComponent } from '../menu/menu.component';

@Component( {
  selector: 'doc-header',
  imports: [OverlayModule, NgOptimizedImage, MenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
} )
export class HeaderComponent {

  private readonly appService = inject( AppService );

  isOpen = false;

  get chapters(): Array<TopMenuItem> {
    return this.appService.chapters;
  }

  isSelected(
    chapter: Chapter
  ): 'selected' | '' {
    return chapter === this.appService.chapter ? 'selected' : '';
  }

  selectChapter(
    chapter: Chapter
  ): void {

    if (this.appService.chapter !== chapter) {
      this.appService.setChapter( chapter );
    }
  }

  close(): void {
    this.isOpen = false;
  }
}
