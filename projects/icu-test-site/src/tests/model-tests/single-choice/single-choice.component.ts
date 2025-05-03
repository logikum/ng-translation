/* 3rd party libraries */
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgTranslationModule } from '@logikum/ng-translation';
import { NgtSingleChoice } from '@logikum/ng-translatable';

/* locally accessible feature module code, always use a relative path */

@Component({
  selector: 'icu-single-choice',
  imports: [
    NgTranslationModule,
    FormsModule
  ],
  templateUrl: './single-choice.component.html',
  styleUrl: './single-choice.component.css'
})
export class SingleChoiceComponent {

  seasons = new NgtSingleChoice( 'enums.season' );
  months = new NgtSingleChoice(
    'enums.month',
    this.filterByText.bind( this )
  );
  filterText = '';

  get selectedSeason(): string {
    return JSON.stringify( this.seasons.selectedItem );
  }

  get selectedMonth(): string {
    return JSON.stringify( this.months.selectedItem );
  }

  private filterByText(
    value: string,
    text: string
  ): boolean {

    if (this.filterText) {
      return text.includes( this.filterText );
    }
    return true;
  }

  changeSeason(
    event: any
  ): void {
    this.seasons.selectedValue = event.target.value;
  }

  changeByValue(
    event: any
  ): void {
    this.months.selectedValue = event.target.value;
  }

  changeByIndex(
    event: any
  ): void {
    this.months.selectedIndex = parseInt( event.target.value, 10 );
  }
}
