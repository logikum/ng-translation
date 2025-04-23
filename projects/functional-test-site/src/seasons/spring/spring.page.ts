import { Component } from '@angular/core';
import { SeasonsMenuComponent } from '../seasons-menu/seasons-menu.component';
import { NgTranslationModule } from 'ng-translation';

@Component({
  selector: 'fts-spring',
  imports: [
    SeasonsMenuComponent,
    NgTranslationModule
  ],
  templateUrl: './spring.page.html',
  styleUrl: './spring.page.css'
})
export class SpringPage {

}
