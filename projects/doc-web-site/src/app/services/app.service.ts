import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Menu } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private menu: Subject<Array<Menu>> = new Subject<Array<Menu>>();
  private version: Subject<string> = new Subject<string>();

  get menu$(): Observable<Array<Menu>> {
    return this.menu.asObservable();
  }
  get version$(): Observable<string> {
    return this.version.asObservable();
  }

  setMenu(
    menu: Array<Menu>
  ): void {
    this.menu.next( menu );
  }

  setVersion(
    url: string
  ): void {
    this.version.next( url );
  }
}
