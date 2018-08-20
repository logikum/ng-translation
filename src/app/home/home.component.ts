import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslatableTextList } from 'projects/ng-translation/src/lib/translatable-text-list.model';
import { TranslationService } from '../../../projects/ng-translation/src/lib/translation.service';

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
