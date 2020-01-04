import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Menu } from '../shared';

import { AppService } from './services/app.service';
import { VersionFactory } from '../shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  @ViewChild('version', { static: true }) versionSelect;

  versions$ = VersionFactory.create();
  menu: Menu;

  get menu$(): Observable<Menu> {
    return this.svcApp.menu$;
  }

  constructor(
    private router: Router,
    private svcApp: AppService
  ) {
    this.svcApp.menu$.subscribe( menu => {
      this.menu = menu;
    } );
    this.svcApp.version$.subscribe( url => {
      this.versionSelect.nativeElement.value = url;
      this.router.navigateByUrl( url );
    } );
  }

  ngOnInit(): void {
    this.versions$ = VersionFactory.create();
  }

  versionChange(
    event: any
  ): void {
    this.router.navigateByUrl( event.target.value );
  }
}
