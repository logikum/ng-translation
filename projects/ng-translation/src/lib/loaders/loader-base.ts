/* 3rd party libraries */
import { HttpClient } from '@angular/common/http';

/* locally accessible feature module code, always use relative path */
import { Locale, Resource, ResourceLoader } from '../models';
import { MessengerService } from '../services';
import { buildPath } from './build-path';

export class LoaderBase<T> implements ResourceLoader {

  constructor(
    protected options,
    protected readonly http: HttpClient,
    protected readonly messenger: MessengerService
  ) { }

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
          error( error ) {
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
