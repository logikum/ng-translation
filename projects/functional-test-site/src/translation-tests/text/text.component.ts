/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { NgTranslationModule, TranslationService } from '@logikum/ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-text',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './text.component.html',
  styleUrl: './text.component.css'
})
export class TextComponent {

  private translation = inject(TranslationService);

  get elements(): string { return this.translation.get('translation.text.otherElements'); }
  get earth(): string { return this.translation.get('translation.text.element.earth'); }
  get water(): string { return this.translation.get('translation.text.element.water'); }
  get wind(): string{ return this.translation.get('translation.text.element.wind'); }
  get fire(): string { return this.translation.get('translation.text.element.fire'); }

  get seasons(): string { return this.translation.get('app.fourSeasons'); }
  get spring(): string { return this.translation.get('enums.season.spring'); }
  get summer(): string { return this.translation.get('enums.season.summer'); }
  get autumn(): string{ return this.translation.get('enums.season.autumn'); }
  get winter(): string { return this.translation.get('enums.season.winter'); }
}
