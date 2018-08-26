import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-configuration',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent { }
