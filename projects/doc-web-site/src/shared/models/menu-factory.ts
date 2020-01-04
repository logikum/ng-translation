import { Menu } from './menu';
import { MENU } from '../constants/MENU';
import { PATH } from '../constants/PATH';

export class MenuFactory {

  static create(
    basePath: string
  ): Menu {

    const menu: Menu = new Menu( basePath );

    menu.add( PATH.setup, MENU.setup );
    menu.add( PATH.configuration, MENU.configuration );
    menu.add( PATH.usage, MENU.usage );
    menu.add( PATH.selectionList, MENU.selectionList );
    menu.add( PATH.textList, MENU.textList );
    menu.add( PATH.api, MENU.api );

    return menu;
  }
}
