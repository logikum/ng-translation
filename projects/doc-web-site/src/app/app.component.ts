import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { VERSION } from '../shared';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  useHeader$ = new BehaviorSubject<boolean>(true);

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {
    router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      const useHeader = e.url === '/' || e.url.startsWith( VERSION.v3_5 );
      this.useHeader$.next( useHeader );
      // cdRef.detectChanges();
      console.log(e.id, e.url);
    });
  }
}
