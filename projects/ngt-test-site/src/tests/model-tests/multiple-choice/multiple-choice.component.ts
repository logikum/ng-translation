/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgTranslationModule } from '@logikum/ng-translation';
import { NgtMultipleChoice } from '@logikum/ngt-models';

/* locally accessible feature module code, always use a relative path */
import { AppService } from '../../../app/app.service';

@Component({
  selector: 'nts-multiple-choice',
  imports: [
    NgTranslationModule,
    FormsModule
  ],
  templateUrl: './multiple-choice.component.html',
  styleUrl: './multiple-choice.component.css'
})
export class MultipleChoiceComponent {

  private readonly appService = inject( AppService );

  seasons = new NgtMultipleChoice(
    this.appService.translation,
    'enums.season'
  );
  months = new NgtMultipleChoice(
    this.appService.translation,
    'enums.month',
    this.filterByText.bind( this )
  );
  filterText = '';

  get selectedSeasons(): string {
    return this.seasons.selectedCount === 0 ? '' :
      this.formatAsHtml( JSON.stringify( this.seasons.selectedItems ) );
  }

  get selectedMonths(): string {
    return this.months.selectedCount === 0 ? '' :
      JSON.stringify( this.months.selectedItems )
        .replace( '[', '[<br>' )
        .replace( ']', '<br>]' )
        .split( '},{' ).join( '},<br>{' )
        .split( '{' ).join( '&nbsp;&nbsp;&nbsp;&nbsp;{' );
  }

  private  formatAsHtml(
    list: string
  ): string {

    return list
      .replace( '[', '[<br>' )
      .replace( ']', '<br>]' )
      .split( '},{' ).join( '},<br>{' )
      .split( '{' ).join( '&nbsp;&nbsp;&nbsp;&nbsp;{' );
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

  changeByValues(
    event: any
  ): void {

    const values: Array<string> = [];
    const options = event.target.selectedOptions;
    for (let i = 0; i < options.length; ++i) {
      values.push( options[i].value );
    }
    this.seasons.selectedValues = values;
  }

  changeByIndexes(
    event: any
  ): void {

    const indexes: Array<number> = [];
    const options = event.target.selectedOptions;
    for (let i = 0; i < options.length; ++i) {
      indexes.push( parseInt( options[i].value, 10 ) );
    }
    this.seasons.selectedIndexes = indexes;
  }

  changeMonth(
    event: any
  ): void {
    this.months.setState( event.target.value, event.target.checked );
  }
}
