import { ChangeDetectionStrategy, Component } from '@angular/core';

import _install from 'raw-loader!./_install.txt';
import _setup from 'raw-loader!./_setup.txt';
import _feature from 'raw-loader!./_feature.txt';
import _lazy from 'raw-loader!./_lazy.txt';
import _guard from 'raw-loader!./_guard.txt';

@Component({
  selector: 'app-home',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetupComponent {

  readonly install = _install;
  readonly setup = _setup;
  readonly feature = _feature;
  readonly lazy = _lazy;
  readonly guard = _guard;
}
