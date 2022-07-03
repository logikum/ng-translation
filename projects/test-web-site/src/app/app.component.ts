import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit
} from '@angular/core';
import { TranslationChange, TranslationService } from 'ng-translation';
import { TranslatableLanguageList, TranslatableOptionList } from 'ng-translatable';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class AppComponent implements OnInit {

  initialized = false;
  menu: TranslatableOptionList;
  languages: TranslatableLanguageList;

  constructor(
    private cdRef: ChangeDetectorRef,
    private translate: TranslationService
  ) {
    this.translate.statusChange.subscribe( this.ngtChanges.bind( this ) );
    this.menu = new TranslatableOptionList( translate, 'app.menu' );
    this.languages = new TranslatableLanguageList( translate, 'app.languages' );
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

  private ngtChanges(
    change: TranslationChange
  ): void {

    console.log( change.description );
    if (change.context === 'app' && change.action === 'finish') {
      this.initialized = true;
      this.cdRef.detectChanges();
    }
  }
}
