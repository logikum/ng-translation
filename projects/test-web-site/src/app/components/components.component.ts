import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslatableOptionList, TranslatableTextList, TranslationService } from 'ng-translation';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsComponent implements OnInit {

  months: TranslatableOptionList;
  seasons: TranslatableOptionList;
  texts: TranslatableTextList;

  get selectedMonth(): string {
    return JSON.stringify( this.months.selectedItem );
  }
  get selectedSeason(): string {
    return JSON.stringify( this.seasons.selectedItem );
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
        'app.languages': 'lng'
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
}