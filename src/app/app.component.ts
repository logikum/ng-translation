import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslationService } from '../../projects/ng-translation/src/lib/translation.service';

@Component({
  selector: 'app-root',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  active = 'en';
  isTranslated = true;

  constructor(
    private cdRef: ChangeDetectorRef,
    private translate: TranslationService
  ) { }

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
    language: string
  ): void {
    this.translate.changeLanguage( language );
    this.active = language;
  }
}
