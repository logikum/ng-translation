/* 3rd party libraries */
import { Component } from '@angular/core';

/* locally accessible feature module code, always use a relative path */

@Component({
  selector: 'doc-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  thisYear = new Date().getFullYear();
}
