import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { Menu, VersionFactory } from '../../shared';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @ViewChild('version', { static: true }) versionSelect;

  versions$ = VersionFactory.create();
  menu1: Menu;
  menu2: Menu;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private svcApp: AppService
  ) {
    this.svcApp.menu$.subscribe( menu => {
      this.menu1 = menu[0];
      if (menu.length > 1) {
        this.menu2 = menu[1];
      }
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
