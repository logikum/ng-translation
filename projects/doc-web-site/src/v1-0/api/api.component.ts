import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiComponent { }
