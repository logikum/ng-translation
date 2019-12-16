import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslatableOption, TranslatableOptionList, TranslationService, TranslatableTextList } from 'ng-translation';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit, OnDestroy {

  monthList: TranslatableOptionList;
  textList: TranslatableTextList;

  get months(): Array<TranslatableOption> { return this.monthList.items; }

  get dailyOffer(): string {
    return this.textList.get( 'offer', { buy: 3, pay: 2 } );
  }
  get specialOffer(): string {
    return this.textList.get( 'special', [ 'Jackie Chan', 20 ] );
  }
  get specialLasts(): string {
    return this.textList.get( 'lasts', 4 );
  }

  constructor(
    private translate: TranslationService
  ) {
    this.monthList = new TranslatableOptionList( translate, 'app.month' );

    this.textList = new TranslatableTextList(
      translate,
      {
        'app.home.title': 'seasons',
        'spring.index.title': 'spring',
        'app.shared.summer': 'summer',
        'app.shared.autumn': 'autumn',
        'app.shared.winter': 'winter',
        'app.shop.offer': 'offer',
        'app.shop.special': 'special',
        'app.shop.sale': 'lasts'
      }
    );
  }

  ngOnInit() {
    // this.monthList.items[ new Date( Date.now() ).getMonth() ].selected = true;
    this.monthList.selectedValue = this.monthList.items[ new Date( Date.now() ).getMonth() ].value;
  }

  ngOnDestroy() {
    this.textList.destroy();
  }
}
