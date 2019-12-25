import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetupComponent { }
