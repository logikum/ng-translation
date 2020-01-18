import { ChangeDetectionStrategy, Component } from '@angular/core';

import _translation from 'raw-loader!./_translation.txt';
import _code from 'raw-loader!./_code.txt';
import _view from 'raw-loader!./_view.txt';
import _properties from 'raw-loader!./_properties.txt';

@Component({
  selector: 'app-select-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionListComponent {

  readonly translation = _translation;
  readonly code = _code;
  readonly view = _view;
  readonly properties = _properties;
}
