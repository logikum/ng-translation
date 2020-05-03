import { Component, OnInit } from '@angular/core';
import { TranslationsService } from '../../translations.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  value = 'Angular';

  constructor(
    public translations: TranslationsService
  ) { }
}
