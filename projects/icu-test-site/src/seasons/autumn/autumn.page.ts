/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { TranslationService } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { SeasonsMenuComponent } from '../seasons-menu/seasons-menu.component';
import { IText_Seasons$Autumn } from '../../if-texts/seasons/i-text-autumn';

@Component({
  selector: 'icu-fall',
  imports: [
    SeasonsMenuComponent
  ],
  templateUrl: './autumn.page.html',
  styleUrl: './autumn.page.css'
})
export class AutumnPage {

  private readonly translation = inject( TranslationService );
  t = this.translation.getBranch<IText_Seasons$Autumn>('seasons/autumn');
}
