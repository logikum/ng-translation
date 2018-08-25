import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-select-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.css']
})
export class SelectionListComponent { }
