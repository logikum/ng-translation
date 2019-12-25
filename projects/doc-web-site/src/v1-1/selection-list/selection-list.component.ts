import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-select-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionListComponent { }
