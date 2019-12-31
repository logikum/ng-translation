import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-excerpt',
  templateUrl: './excerpt.component.html',
  styleUrls: ['./excerpt.component.css']
})
export class ExcerptComponent {

  @Input() text: string;
}
