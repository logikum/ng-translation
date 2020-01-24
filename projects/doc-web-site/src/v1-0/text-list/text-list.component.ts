import { ChangeDetectionStrategy, Component } from '@angular/core';

import _translation1 from 'raw-loader!./_translation-1.txt';
import _code from 'raw-loader!./_code.txt';
import _keyString from 'raw-loader!./_key-string.txt';
import _keyArray from 'raw-loader!./_key-array.txt';
import _keyObject from 'raw-loader!./_key-object.txt';
import _translation2 from 'raw-loader!./_translation-2.txt';
import _interpolation from 'raw-loader!./_interpolation.txt';

@Component({
  selector: 'app-text-list',
  templateUrl: './text-list.component.html',
  styleUrls: ['./text-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextListComponent {

  readonly translation1 = _translation1;
  readonly code = _code;
  readonly keyString = _keyString;
  readonly keyArray = _keyArray;
  readonly keyObject = _keyObject;
  readonly translation2 = _translation2;
  readonly interpolation = _interpolation;
  buy = '';
  pay = '';
}
