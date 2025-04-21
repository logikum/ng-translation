/* 3rd party libraries */
import { inject } from '@angular/core';

/* locally accessible feature module code, always use relative path */
import { Resource, ResourceLoader } from '../models';
import { MessengerService } from '../services';
import { InlineLoaderMap } from '../types';

export class InlineLoader implements ResourceLoader {

  private readonly messenger = inject( MessengerService );

  constructor(
    private readonly loaders: InlineLoaderMap
  ) { }

  load(
    language: string,
    resource: Resource
  ): Promise<object> {

    const loader = this.loaders[ resource.name ];
    if (loader) {
      return loader( language, resource.name );
    } else {
      this.messenger.error( `No inline loader for ${ resource.name }.` );
    }
  }
}
