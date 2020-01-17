import { Component } from '@angular/core';

import _localization from 'raw-loader!./_localization.txt';

import _numberFormat from 'raw-loader!./number/_format.txt';
import _numberUsage from 'raw-loader!./number/_usage.txt';
import _numberResult from 'raw-loader!./number/_result.txt';

import _percentFormat from 'raw-loader!./percent/_format.txt';
import _percentUsage from 'raw-loader!./percent/_usage.txt';
import _percentResult from 'raw-loader!./percent/_result.txt';

import _currencyFormat from 'raw-loader!./currency/_format.txt';
import _currencyUsage from 'raw-loader!./currency/_usage.txt';
import _currencyResult from 'raw-loader!./currency/_result.txt';

import _dateFormat from 'raw-loader!./date/_format.txt';
import _dateUsage from 'raw-loader!./date/_usage.txt';
import _dateResult from 'raw-loader!./date/_result.txt';

import _pluralFormat from 'raw-loader!./plural/_format.txt';
import _pluralUsage from 'raw-loader!./plural/_usage.txt';
import _pluralResult from 'raw-loader!./plural/_result.txt';

@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.css']
})
export class LocalizationComponent {

  readonly localization = _localization;

  readonly numberFormat = _numberFormat;
  readonly numberUsage = _numberUsage;
  readonly numberResult = _numberResult;

  readonly percentFormat = _percentFormat;
  readonly percentUsage = _percentUsage;
  readonly percentResult = _percentResult;

  readonly currencyFormat = _currencyFormat;
  readonly currencyUsage = _currencyUsage;
  readonly currencyResult = _currencyResult;

  readonly dateFormat = _dateFormat;
  readonly dateUsage = _dateUsage;
  readonly dateResult = _dateResult;

  readonly pluralFormat = _pluralFormat;
  readonly pluralUsage = _pluralUsage;
  readonly pluralResult = _pluralResult;
}
