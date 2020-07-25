/* 3rd party libraries */
import { HttpClient } from '@angular/common/http';

/* locally accessible feature module code, always use relative path */
import { Locale, Resource, ResourceLoader } from '../models';
import { MessengerService } from '../services';
import { buildPath } from './build-path';

export class TextLoader implements ResourceLoader {

  constructor(
    private readonly http: HttpClient,
    private readonly messenger: MessengerService
  ) { }

  load(
    language: string,
    resource: Resource
  ): Promise<string> {

    const locale = new Locale( language );
    return new Promise<string>( ( resolve, reject ) => {

      let url = buildPath( locale.name, resource );
      this.http.get( url, { responseType: 'text' } )
        .toPromise()
        .then( translations => {
          resolve( translations );
        } )
        .catch( error => {

          if (locale.hasRegion) {
            this.messenger.info( `Using alternative: ${ locale.neutral }` );

            url = buildPath( locale.neutral, resource );
            this.http.get( url, { responseType: 'text' } )
              .toPromise()
              .then( translations => {
                resolve( translations );
              } )
              .catch( error2 => {
                reject( error );
              } );

          } else {
            reject( error );
          }
        } );
    } );
  }
}
