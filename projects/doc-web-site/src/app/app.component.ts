import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Menu, Option, VERSION } from '../shared';

import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  private versions: Array<Option> = new Array<Option>();
  versions$: Observable<Array<Option>> = new Observable<Array<Option>>();
  menu: Menu;

  get menu$(): Observable<Menu> {
    return this.svcApp.menu$;
  }

  constructor(
    private router: Router,
    private svcApp: AppService
  ) {
    this.versions.push( { value: VERSION.v2_0, text: 'Version 2.0' } );
    this.versions.push( { value: VERSION.v1_0, text: 'Version 1.0' } );

    this.svcApp.menu$.subscribe( menu => {
      this.menu = menu;
    } );
  }

  ngOnInit(): void {
    this.versions$ = of( this.versions );
  }

  versionChange(
    event: any
  ): void {
    this.router.navigateByUrl( event.target.value );
  }
}
