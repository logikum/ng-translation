/* 3rd party libraries */
import { HttpClient } from '@angular/common/http';
import { MessengerService } from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import { Locale, Resource, ResourceLoader } from '../models';
import { buildPath } from './build-path';

export class LoaderBase<T> implements ResourceLoader {

  private readonly options: { [ key: string ]: any };

  constructor(
    protected readonly responseType: 'json' | 'text' | 'blob' | 'arraybuffer',
    protected readonly http: HttpClient,
    protected readonly messenger: MessengerService
  ) {
    this.options = { responseType };
  }

  load(
    language: string,
    resource: Resource
  ): Promise<T> {

    const locale = new Locale( language );
    return new Promise<T>( ( resolve, reject ) => {

      const self = this;
      let url = buildPath( locale.name, resource );

      const s1 = this.http.get( url, this.options )
        .subscribe( {
          next( translations ) {
            resolve( translations as T );
          },
          error( error: Error ) {
            if (locale.hasRegion) {
              self.messenger.info( `Using alternative: ${ locale.neutral }` );

              url = buildPath( locale.neutral, resource );
              const s2 = self.http.get( url, self.options )
                .subscribe( {
                  next( translations ) {
                    resolve( translations as T );
                  },
                  error( err ) {
                    reject( error );
                  },
                  complete() {
                    s2.unsubscribe();
                  }
                } );
            } else {
              reject( error );
            }
          },
          complete() {
            s1.unsubscribe();
          }
        } );
    } );
  }
}
