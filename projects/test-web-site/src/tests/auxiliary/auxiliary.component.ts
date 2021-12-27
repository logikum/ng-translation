import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslationService } from 'ng-translation';
import { TranslatableTextList } from 'ng-translatable';

@Component( {
  selector: 'app-auxiliary',
  templateUrl: './auxiliary.component.html',
  styleUrls: [ './auxiliary.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class AuxiliaryComponent {

  texts: TranslatableTextList;
  dailyData = { buy: 3, pay: 2 };
  specialData = [ 'Jackie Chan', 20 ];
  period = 4;

  get dailyOffer(): string {
    return this.texts.get( 'offer', this.dailyData );
  }

  get specialOffer(): string {
    return this.texts.get( 'special', this.specialData );
  }

  get specialLasts(): string {
    return this.texts.get( 'lasts', this.period );
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
