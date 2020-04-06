import {
  ChangeDetectionStrategy, Component, OnDestroy, OnInit
} from '@angular/core';
import {
  TranslatableLanguageList, TranslatableOptionList, TranslationService
} from 'ng-translation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  menu: TranslatableOptionList;
  languages: TranslatableLanguageList;

  constructor(
    private translate: TranslationService
  ) {
    this.menu = new TranslatableOptionList( this.translate, 'app.menu' );
    this.languages = new TranslatableLanguageList( this.translate, 'app.languages' );
  }

  ngOnInit(): void {

    // Set the initial language.
    const s = this.translate.languageChanged
      .subscribe( language => {
        this.languages.selectedValue = language;
        s.unsubscribe();
      } );
  }

  changeLanguage(
    event: any
  ): void {

    this.languages.selectedValue = event.target.value;
  }
}
