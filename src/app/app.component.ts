import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslationService } from '../../projects/ng-translation/src/lib/translation.service';
import { Option } from './option.model';

@Component({
  selector: 'app-root',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  active = 'en';
  isTranslated = true;
  languages: Array<Option> = [];

  constructor(
    private cdRef: ChangeDetectorRef,
    private translate: TranslationService
  ) { }

  ngOnInit() {
    this.translate.languageChange.subscribe( language => {
      this.getLangauges();

      this.isTranslated = false;
      this.cdRef.detectChanges();

      this.isTranslated = true;
      this.cdRef.markForCheck();
      this.cdRef.detectChanges();
    } );
    this.getLangauges();
  }

  getLangauges() {
    this.languages.length = 0;
    const languageGroup = this.translate.getGroup( 'app.languages' );
    const languageCodes = Object.getOwnPropertyNames( languageGroup );
    languageCodes.forEach( code => {
      this.languages.push( {
         code: code,
          name: languageGroup[ code ],
          selected: code === this.active
         } );
    } );
  }

  changeLanguage(
    event: any
  ): void {
    this.active = event.target.value;
    this.translate.changeLanguage( this.active );
  }
}
