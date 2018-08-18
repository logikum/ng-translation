import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../../projects/ng-translation/src/lib/translation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dailyOffer: string;

  constructor(
    private translate: TranslationService
  ) { }

  ngOnInit() {
    this.translate.languageChange.subscribe( language => {
      this.getMessages();
    } );
    this.getMessages();
  }

  getMessages() {
    this.dailyOffer = this.translate.get( 'app.home.offer', { buy: 3, pay: 2 } );
  }
}
