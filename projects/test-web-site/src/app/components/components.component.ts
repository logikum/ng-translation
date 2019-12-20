import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslatableOptionList, TranslatableTextList, TranslationService } from 'ng-translation';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsComponent implements OnInit, OnDestroy {

  months: TranslatableOptionList;
  texts: TranslatableTextList;

  get selectedItem(): string {
    return JSON.stringify( this.months.selectedItem );
  }
  get dailyOffer(): string {
    return this.texts.get( 'offer', { buy: 3, pay: 2 } );
  }
  get specialOffer(): string {
    return this.texts.get( 'special', [ 'Jackie Chan', 20 ] );
  }
  get specialLasts(): string {
    return this.texts.get( 'lasts', 4 );
  }

  constructor(
    private translate: TranslationService
  ) {
    this.months = new TranslatableOptionList( translate, 'app.month' );

    this.texts = new TranslatableTextList(
      translate,
      {
        'app.home.title': 'seasons',
        'spring.index.title': 'spring',
        'app.menu.summer': 'summer',
        'app.menu.autumn': 'autumn',
        'app.menu.winter': 'winter',
        'app.shop.offer': 'offer',
        'app.shop.special': 'special',
        'app.shop.sale': 'lasts'
      }
    );
  }

  ngOnInit() {
    this.months.selectedIndex = new Date( Date.now() ).getMonth();
  }

  monthChange(
    event: any
  ): void {
    this.months.selectedValue = event.target.value;
  }

  ngOnDestroy() {
    this.months.destroy();
    this.texts.destroy();
  }
}
