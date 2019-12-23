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
  seasons: TranslatableOptionList;
  texts: TranslatableTextList;

  get selectedMonth(): string {
    return JSON.stringify( this.months.selectedItem );
  }
  get selectedSeason(): string {
    return JSON.stringify( this.seasons.selectedItem );
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
    this.seasons = new TranslatableOptionList( translate, 'app.menu' );

    this.texts = new TranslatableTextList(
      translate,
      {
        'app.home.title': 'seasons',
        'spring.index.title': 'spring',
        'app.menu.summer': 'summer',
        'app.menu.autumn': 'autumn',
        'app.menu.winter': 'winter',
        'app.languages': 'lng',
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

  seasonChange(
    event: any
  ): void {
    this.seasons.selectedValue = event.target.value;
  }

  ngOnDestroy() {
    this.months.destroy();
    this.seasons.destroy();
    this.texts.destroy();
  }
}
