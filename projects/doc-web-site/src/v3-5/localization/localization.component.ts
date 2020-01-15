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
}
