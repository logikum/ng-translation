import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigurationComponent { }
