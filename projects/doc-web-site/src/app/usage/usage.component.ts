import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-usage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.css']
})
export class UsageComponent { }
