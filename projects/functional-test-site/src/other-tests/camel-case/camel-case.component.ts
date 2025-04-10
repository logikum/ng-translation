/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule, NgtReaderDirective } from '@logikum/ng-translation';
import { LogLevel } from '../../shared/enums/enums';
import { AppStatus } from '../../app/enums/app-status.enum';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-camel-case',
  imports: [
    NgTranslationModule,
    NgtReaderDirective
  ],
  templateUrl: './camel-case.component.html',
  styleUrl: './camel-case.component.css'
})
export class CamelCaseComponent {

  logLevel = LogLevel.success;
  appStatus = AppStatus.operate;
  protected readonly date = new Date();
}
