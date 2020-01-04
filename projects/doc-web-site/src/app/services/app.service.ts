import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Menu } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private menu: Subject<Menu> = new Subject<Menu>();
  private version: Subject<string> = new Subject<string>();

  get menu$(): Observable<Menu> {
    return this.menu.asObservable();
  }

  get version$(): Observable<string> {
    return this.version.asObservable();
  }

  constructor() { }

  setMenu(
    menu: Menu
  ): void {
    this.menu.next( menu );
  }

  setVersion(
    url: string
  ): void {
    this.version.next( url );
  }
}
