/* 3rd party libraries */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/* locally accessible feature module code, always use a relative path */
import { Chapter, ContentChangeEvent } from './content-change.event';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private changeSubject: BehaviorSubject<ContentChangeEvent>;
  chapter: Chapter = 'home';
  title = '';
  content = '';

  get contentChange$(): Observable<ContentChangeEvent> {
    return this.changeSubject.asObservable();
  }

  constructor() {
    this.changeSubject = new BehaviorSubject<ContentChangeEvent>({
      chapter: this.chapter,
      content: this.content
    });
  }

  setChapter(
    chapter: Chapter,
    title: string
  ): void {
    this.chapter = chapter;
    this.title = title;
    this.content = '';
    this.sendNotification();
  }

  setContent(
    content: string
  ): void {
    this.content = content;
    this.sendNotification();
  }

  private sendNotification(): void {
    this.changeSubject.next({
      chapter: this.chapter,
      content: this.content
    });
  }
}
