/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { Locale, Resource, ResourceLoader } from '../models';
import { MessengerService } from '../services';
import { InlineLoaderMap } from '../types';

export class InlineLoader implements ResourceLoader {

  constructor(
    private readonly loaders: InlineLoaderMap,
    private readonly messenger: MessengerService
  ) {
  }

  load(
    language: string,
    resource: Resource
  ): Promise<object> {

    const locale = new Locale( language );
    const loader = this.loaders[ resource.name ];
    if (loader) {
      return loader( language, resource.name );
    } else {
      this.messenger.error( `No inline loader for ${ resource.name }.` );
    }
  }
}
