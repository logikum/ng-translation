import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslationService, TranslatableTextList } from 'ng-translation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private texts: TranslatableTextList;

  get dailyOffer(): string {
    return this.texts.get( 'app.home.offer', { buy: 3, pay: 2 } );
  }

  constructor(
    private translate: TranslationService
  ) {
    this.texts = new TranslatableTextList( this.translate, 'app.home.offer' );
   }

  ngOnInit() { }

  ngOnDestroy() {
    this.texts.destroy();
  }
}
