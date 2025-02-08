import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component( {
    selector: 'app-null',
    templateUrl: './null.component.html',
    styleUrls: ['./null.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
} )
export class NullComponent {

  today = new Date( Date.now() );
}
