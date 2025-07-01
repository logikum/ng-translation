/* 3rd party libraries */
import { AsyncPipe } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/* locally accessible feature module code, always use a relative path */
import { AppService } from './app.service';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'doc-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private appService = inject(AppService);
  private hiddenSubject = new BehaviorSubject<boolean>(false);

  title = 'NgTranslation';
  @ViewChild('sideMenu', { read: ElementRef}) private sideMenu: ElementRef;

  get hidden$(): Observable<boolean> {
    return this.hiddenSubject.asObservable();
  }

  constructor() {
    this.appService.contentChange$
      .pipe(takeUntilDestroyed())
      .subscribe(contentChange => {
        this.hiddenSubject.next(['home', 'about'].includes(contentChange.chapter));
    });
  }
}
