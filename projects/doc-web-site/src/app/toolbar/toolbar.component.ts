import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Menu, VersionFactory } from '../../shared';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {

  @ViewChild('version', { static: true }) versionSelect;

  versions$ = VersionFactory.create();
  menu: Menu;

  get menu$(): Observable<Menu> {
    return this.svcApp.menu$;
  }

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private svcApp: AppService
  ) {
    this.svcApp.menu$.subscribe( menu => {
      this.menu = menu;
      cdRef.detectChanges();
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
