/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { TranslationService } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { SeasonsMenuComponent } from '../seasons-menu/seasons-menu.component';
import { IText_Seasons$Spring } from '../../if-texts/seasons/i-text-spring';

@Component({
  selector: 'icu-spring',
  imports: [
    SeasonsMenuComponent
  ],
  templateUrl: './spring.page.html',
  styleUrl: './spring.page.css'
})
export class SpringPage {

  private readonly translation = inject( TranslationService );
  t = this.translation.getBranch<IText_Seasons$Spring>('seasons/spring');
}
