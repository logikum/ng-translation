import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslatableOptionList, TranslatableTextList, TranslationService } from 'ng-translation';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsComponent implements OnInit {

  private spring: TranslatableTextList;

  months: TranslatableOptionList;
  seasons: TranslatableOptionList;
  texts: TranslatableTextList;

  get selectedMonth(): string {
    return JSON.stringify( this.months.selectedItem );
  }
  get selectedSeason(): string {
    return JSON.stringify( this.seasons.selectedItem );
  }
  get line1(): string { return this.spring.get( 'line_1_1' ); }
  get line2(): string { return this.spring.get( 'line_1_2' ); }
  get line3(): string { return this.spring.get( 'line_1_3' ); }
  get line4(): string { return this.spring.get( 'line_1_4' ); }

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
        'app.languages': 'lng'
      }
    );
    this.spring = new TranslatableTextList( translate, 'spring.index' );
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
}
