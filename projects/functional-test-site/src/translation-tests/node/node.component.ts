/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-node',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './node.component.html',
  styleUrl: './node.component.css'
})
export class NodeComponent {

}
