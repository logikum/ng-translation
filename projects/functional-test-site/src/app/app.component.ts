/* 3rd party libraries */
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslationService } from '@logikum/ng-translation';

/* locally accessible feature module code, always use relative path */
import { HeaderComponent } from './header/header.component';
import { TitleComponent } from './title/title.component';

@Component({
  selector: 'fts-root',
  imports: [ RouterOutlet, HeaderComponent, TitleComponent, AsyncPipe ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  private translation = inject(TranslationService);

  get isInitialized(): Observable<boolean> { return this.translation.isInitialized; }
}
