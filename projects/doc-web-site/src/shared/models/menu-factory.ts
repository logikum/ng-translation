import { Menu } from './menu';
import { MENU } from '../constants/MENU';
import { PATH } from '../constants/PATH';
import { VERSION } from '../constants/VERSION';

export class MenuFactory {

  static create(
    basePath: string
  ): Array<Menu> {

    const menu1: Menu = new Menu( basePath );
    menu1.add( PATH.setup, MENU.setup );
    menu1.add( PATH.configuration, MENU.configuration );
    menu1.add( PATH.usage, MENU.usage );
    if (basePath === VERSION.v3_5) {
      menu1.add( PATH.localization, MENU.localization );
    }

    const menu2: Menu = new Menu( basePath );
    menu2.add( PATH.selectionList, MENU.selectionList );
    menu2.add( PATH.textList, MENU.textList );
    menu2.add( PATH.api, MENU.api );

    return [ menu1, menu2 ];
  }
}
