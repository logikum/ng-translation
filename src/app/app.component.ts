import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslatableOption } from 'projects/ng-translation/src/lib/translatable-option.model';
import { TranslatableOptionList } from 'projects/ng-translation/src/lib/translatable-option-list.model';
import { TranslationService } from '../../projects/ng-translation/src/lib/translation.service';

@Component({
  selector: 'app-root',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private languageList: TranslatableOptionList;

  isTranslated = true;
  get languages(): Array<TranslatableOption> { return this.languageList.items; };

  constructor(
    private cdRef: ChangeDetectorRef,
    private translate: TranslationService
  ) {
    this.languageList = new TranslatableOptionList( translate, 'app.languages' );
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
