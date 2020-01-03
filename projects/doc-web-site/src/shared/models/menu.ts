import { MenuItem } from './menu-item';

export class Menu implements IterableIterator<MenuItem> {

  private items: Array<MenuItem> = new Array<MenuItem>();
  private basePath: string;
  private index = 0;

  constructor(
    basePath: string = '/'
  ) {
    this.basePath = basePath;
  }

  add(
    path: string,
    text: string
  ): void {
    this.items.push( {
      link: `${ this.basePath }/${ path }`,
      text: text
    } );
  }

  next(): IteratorResult<MenuItem> {
    if (this.index < this.items.length) {
      return { value: this.items[ this.index++ ], done: false };
    } else {
      this.index = 0;
      return { value: undefined, done: true };
    }
  }

  [Symbol.iterator](): IterableIterator<MenuItem> {
    return this;
  }
}
