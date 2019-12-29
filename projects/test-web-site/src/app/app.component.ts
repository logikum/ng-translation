import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatableOption, TranslatableOptionList, TranslationService, TranslatableTextList } from 'ng-translation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  private languageList: TranslatableOptionList;
  private menuList: TranslatableTextList;

  get languages(): Array<TranslatableOption> {
    return this.languageList.items;
  }

  constructor(
    private router: Router,
    private translate: TranslationService
  ) {
    this.languageList = new TranslatableOptionList( this.translate, 'app.languages' );
    this.menuList = new TranslatableTextList(
      this.translate,
      {
        'app.shared.title': 'title',
        'app.shared.spring': 'spring',
        'app.shared.summer': 'summer',
        'app.shared.autumn': 'autumn',
        'app.shared.winter': 'winter',
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

    this.languageList.selectedValue = language;
    const url = this.router.routerState.snapshot.url;
    this.router.navigateByUrl( `refresh-translation?url=${ url }` );
  }

  menuItem(
    key: string
  ): string {
    return this.menuList.get( key );
  }

  ngOnDestroy() {
    this.languageList.destroy();
  }
}
