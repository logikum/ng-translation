import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Menu } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private menu: Subject<Menu> = new Subject<Menu>();

  get menu$(): Observable<Menu> {
    return this.menu.asObservable();
  }

  constructor() { }

  setMenu(
    menu: Menu
  ): void {
    this.menu.next( menu );
  }
}
