import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslationService, TranslatableTextList } from 'ng-translation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private texts: TranslatableTextList;

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
      this.translate,
      {
        'app.home.offer': 'offer',
        'app.home.special': 'special',
        'app.home.sale': 'lasts'
      }
    );
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.texts.destroy();
  }
}
