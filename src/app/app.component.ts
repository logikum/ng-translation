import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OptionList } from '../../projects/ng-translation/src/lib/option-list.model';
import { TranslationService } from '../../projects/ng-translation/src/lib/translation.service';

@Component({
  selector: 'app-root',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isTranslated = true;
  languageList: OptionList;

  constructor(
    private cdRef: ChangeDetectorRef,
    private translate: TranslationService
  ) {
    this.languageList = new OptionList( translate, 'app.languages' );
   }

  ngOnInit() {
    this.translate.languageChange.subscribe( language => {

      this.isTranslated = false;
      this.cdRef.detectChanges();

      this.isTranslated = true;
      this.cdRef.markForCheck();
      this.cdRef.detectChanges();
    } );
  }

  changeLanguage(
    event: any
  ): void {
    this.translate.changeLanguage( event.target.value );
    this.languageList.selectedValue = event.target.value;
  }
}
