import { ChangeDetectionStrategy, Component } from '@angular/core';

import _ngTranslationModule from 'raw-loader!./_ng-translation-module.txt';
import _translationConfig from 'raw-loader!./_translation-config.txt';
import _loadTranslationGuard from 'raw-loader!./_load-translation-guard.txt';
import _translateService from 'raw-loader!./_translate-service.txt';
import _translatePipe from 'raw-loader!./_translate-pipe.txt';
import _translatableOptionList from 'raw-loader!./_translatable-option-list.txt';
import _translatableOption from 'raw-loader!./_translatable-option.txt';
import _translatableTextList from 'raw-loader!./_translatable-text-list.txt';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiComponent {

  readonly ngTranslationModule = _ngTranslationModule;
  readonly translationConfig = _translationConfig;
  readonly loadTranslationGuard = _loadTranslationGuard;
  readonly translateService = _translateService;
  readonly translatePipe = _translatePipe;
  readonly translatableOptionList = _translatableOptionList;
  readonly translatableOption = _translatableOption;
  readonly translatableTextList = _translatableTextList;
}
