import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-text-list',
  templateUrl: './text-list.component.html',
  styleUrls: ['./text-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextListComponent {

  buy = '';
  pay = '';
}
