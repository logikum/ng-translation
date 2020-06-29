import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  TranslatableMultipleChoice, TranslatableOptionList, TranslatableTextList, TranslationService
} from 'ng-translation';

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
  periods: TranslatableMultipleChoice;

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
  get selectedPeriods(): string {
    return this.periods.selectedCount === 0 ? '' :
      JSON.stringify( this.periods.selectedItems )
      .replace( '[', '[<br>')
      .replace( ']', '<br>]')
      .split( '},{' ).join( '},<br>{' )
      .split( '{' ).join( '&nbsp;&nbsp;&nbsp;&nbsp;{' );
  }

  constructor(
    private translate: TranslationService
  ) {
    this.months = new TranslatableOptionList( translate, 'app.month' );
    this.seasons = new TranslatableOptionList( translate, 'app.menu' );
    this.periods = new TranslatableMultipleChoice( translate, 'app.month' );

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

  periodChange(
    event: any
  ): void {
    this.periods.setState( event.target.value, event.target.checked );
  }
}
