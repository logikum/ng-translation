import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatableTextList, TranslationService } from 'ng-translation';

@Component({
  selector: 'app-auxiliary',
  templateUrl: './auxiliary.component.html',
  styleUrls: ['./auxiliary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuxiliaryComponent {

  texts: TranslatableTextList;

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
    this.texts = new TranslatableTextList(
      translate,
      {
        'app.shop.offer': 'offer',
        'app.shop.special': 'special',
        'app.shop.sale': 'lasts'
      }
    );
  }
}
