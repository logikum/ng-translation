import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { TranslationService } from 'ng-translation';
import {
  TranslatableMultipleChoice, TranslatableOptionList, TranslatableTextList
} from 'ng-translatable';

@Component( {
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: [ './components.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class ComponentsComponent implements OnInit {

  private spring: TranslatableTextList;

  months: TranslatableOptionList;
  seasons: TranslatableOptionList;
  texts: TranslatableTextList;
  periods: TranslatableMultipleChoice;
  textFilterBy = '';
  lengthFilterBy = 0;

  get selectedMonth(): string {
    return JSON.stringify( this.months.selectedItem );
  }

  get selectedSeason(): string {
    return JSON.stringify( this.seasons.selectedItem );
  }

  get line1(): string {
    return this.spring.get( 'line_1_1' );
  }

  get line2(): string {
    return this.spring.get( 'line_1_2' );
  }

  get line3(): string {
    return this.spring.get( 'line_1_3' );
  }

  get line4(): string {
    return this.spring.get( 'line_1_4' );
  }

  get selectedPeriods(): string {
    return this.periods.selectedCount === 0 ? '' :
      JSON.stringify( this.periods.selectedItems )
        .replace( '[', '[<br>' )
        .replace( ']', '<br>]' )
        .split( '},{' ).join( '},<br>{' )
        .split( '{' ).join( '&nbsp;&nbsp;&nbsp;&nbsp;{' );
  }

  constructor(
    private readonly translate: TranslationService,
    protected readonly cdRef: ChangeDetectorRef
  ) {
    this.months = new TranslatableOptionList(
      translate, 'app.month',
      this.textFilter.bind( this )
    );
    this.seasons = new TranslatableOptionList( translate, 'app.menu' );
    this.periods = new TranslatableMultipleChoice(
      translate, 'app.month',
      this.lengthFilter.bind( this )
    );

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

  textFilter(
    value: string,
    text: string
  ): boolean {

    if (this.textFilterBy) {
      return text.includes( this.textFilterBy );
    }
    return true;
  }

  lengthFilter(
    value: string,
    text: string
  ): boolean {

    if (this.lengthFilterBy > 0) {
      return text.length <= this.lengthFilterBy;
    }
    return true;
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

  textFilterChange(): void {

    this.months.detectChanges();
    this.cdRef.detectChanges();
  }

  lengthFilterChange(): void {

    this.periods.detectChanges();
    this.cdRef.detectChanges();
  }
}
