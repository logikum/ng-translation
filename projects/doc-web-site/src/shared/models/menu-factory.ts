import { Menu } from './menu';
import { MENU } from '../constants/MENU';
import { PATH } from '../constants/PATH';
import { VERSION } from '../constants/VERSION';

export class MenuFactory {

  static create(
    basePath: string
  ): Menu {

    const menu: Menu = new Menu( basePath );

    menu.add( PATH.setup, MENU.setup );
    menu.add( PATH.configuration, MENU.configuration );
    menu.add( PATH.usage, MENU.usage );
    if (basePath === VERSION.v3_5) {
      menu.add( PATH.localization, MENU.localization );
    }
    menu.add( PATH.selectionList, MENU.selectionList );
    menu.add( PATH.textList, MENU.textList );
    menu.add( PATH.api, MENU.api );

    return menu;
  }
}
