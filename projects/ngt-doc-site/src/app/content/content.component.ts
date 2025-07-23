/* 3rd party libraries */
import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/* locally accessible feature module code, always use a relative path */
import { AppService } from '../app.service';
import { ContentChangeEvent } from '../content-change.event';
import { MarkdownRendererComponent } from '../../markdown-renderer/markdown-renderer';

@Component({
  selector: 'doc-content',
  imports: [
    AsyncPipe, NgIf,
    MarkdownRendererComponent
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

  private readonly appService = inject(AppService);
  private readonly contentSubject = new BehaviorSubject<string>(null);

  get content$(): Observable<string> {
    return this.contentSubject.asObservable();
  }

  constructor() {

    this.appService.contentChange$
      .pipe(takeUntilDestroyed())
      .subscribe(contentChange => {
        this.setContent( contentChange );
      });
  }

  private setContent(
    contentChange: ContentChangeEvent
  ): void {

    if (contentChange.page) {
      let path = '';
      switch (contentChange.page) {
        case '/':
          path = `${ contentChange.chapter }`;
          break;
        case '404':
          path = `404-not-found`;
          break;
        default:
          path = `${ contentChange.chapter }/${ contentChange.page }`;
          break;
      }
      this.contentSubject.next( `/content/${ path }.md` );
    } else {
      this.contentSubject.next( null );
    }
  }
}
