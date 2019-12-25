import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsageComponent { }
