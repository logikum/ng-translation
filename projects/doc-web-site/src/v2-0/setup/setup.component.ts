import { ChangeDetectionStrategy, Component } from '@angular/core';

import _install from 'raw-loader!./_install.txt';
import _root from 'raw-loader!./_root.txt';
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
  readonly root = _root;
  readonly feature = _feature;
  readonly lazy = _lazy;
  readonly guard = _guard;
}
