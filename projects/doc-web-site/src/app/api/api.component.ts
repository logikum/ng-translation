import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-api',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent { }
