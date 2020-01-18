import { ChangeDetectionStrategy, Component } from '@angular/core';

import _config from 'raw-loader!./_config.txt';
import _assets from 'raw-loader!./_assets.txt';
import _translationUrl from 'raw-loader!./_translation-url.txt';
import _translations from 'raw-loader!./_translations.txt';
import _routes1 from 'raw-loader!./_routes-1.txt';
import _sections1 from 'raw-loader!./_sections-1.txt';
import _routes2 from 'raw-loader!./_routes-2.txt';
import _sections2 from 'raw-loader!./_sections-2.txt';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigurationComponent {

  readonly config = _config;
  readonly assets = _assets;
  readonly translationUrl = _translationUrl;
  readonly translations = _translations;
  readonly routes1 = _routes1;
  readonly sections1 = _sections1;
  readonly routes2 = _routes2;
  readonly sections2 = _sections2;
}
