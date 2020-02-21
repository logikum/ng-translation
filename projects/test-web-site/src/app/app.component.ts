import {
  ChangeDetectionStrategy, Component, OnDestroy, OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  TranslatableLanguageList, TranslatableOptionList, TranslationService
} from 'ng-translation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  private readonly onDestroy: Subject<void> = new Subject();

  menu: TranslatableOptionList;
  languages: TranslatableLanguageList;

  constructor(
    private router: Router,
    private translate: TranslationService
  ) {
    this.menu = new TranslatableOptionList( this.translate, 'app.menu' );
    this.languages = new TranslatableLanguageList( this.translate, 'app.languages' );
  }

  ngOnInit(): void {

    const s = this.translate.languageChanged
      .pipe( takeUntil( this.onDestroy ) )
      .subscribe( language => {
        this.languages.selectedValue = language;
        s.unsubscribe();
      } );
  }

  changeLanguage(
    event: any
  ): void {

    const language = event.target.value;
    this.languages.selectedValue = language;
    this.translate.changeLanguage( language );
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
