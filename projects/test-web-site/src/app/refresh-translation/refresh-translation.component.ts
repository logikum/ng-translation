import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-refresh-translation',
  templateUrl: './refresh-translation.component.html',
  styleUrls: ['./refresh-translation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RefreshTranslationComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    const url = this.router.routerState.snapshot.root.queryParams['url'];
    this.router.navigateByUrl( url );
  }
}
