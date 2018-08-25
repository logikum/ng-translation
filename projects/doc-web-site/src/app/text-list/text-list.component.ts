import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-text-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './text-list.component.html',
  styleUrls: ['./text-list.component.css']
})
export class TextListComponent { }
