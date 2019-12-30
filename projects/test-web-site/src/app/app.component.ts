import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatableOptionList, TranslationService, TranslatableTextList } from 'ng-translation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  private texts: TranslatableTextList;

  menu: TranslatableOptionList;
  languages: TranslatableOptionList;

  constructor(
    private router: Router,
    private translate: TranslationService
  ) {
    this.menu = new TranslatableOptionList( this.translate, 'app.menu' );
    this.languages = new TranslatableOptionList( this.translate, 'app.languages' );
    this.texts = new TranslatableTextList(
      this.translate,
      {
        'app.shared.title': 'title',
        'app.shared.tests': 'tests',
        'app.shared.currLang': 'currLang'
      }
    );
  }

  ngOnInit(): void {

    this.translate.languageChanged.subscribe( language => {
      this.reloadPage( language );
    } );
  }

  changeLanguage(
    event: any
  ): void {

    const language = event.target.value;
    this.translate.changeLanguage( language );
  }

  private reloadPage(
    language: string
  ): void {

    this.languages.selectedValue = language;
    const url = this.router.routerState.snapshot.url;
    this.router.navigateByUrl( `refresh-translation?url=${ url }` );
  }

  text(
    key: string
  ): string {
    return this.texts.get( key );
  }

  ngOnDestroy() {
    this.menu.destroy();
    this.languages.destroy();
    this.texts.destroy();
  }
}
