/* 3rd party libraries */
import { HttpClient } from '@angular/common/http';

/* locally accessible feature module code, always use relative path */
import { Locale, Resource, ResourceLoader } from '../models';
import { MessengerService } from '../services';
import { buildUrl } from './build-url';

export class ArrayBufferLoader implements ResourceLoader {

  constructor(
    private readonly http: HttpClient,
    private readonly messenger: MessengerService
  ) { }

  load(
    language: string,
    resource: Resource
  ): Promise<ArrayBuffer> {

    const locale = new Locale( language );
    return new Promise<ArrayBuffer>((resolve, reject) => {

      const url = buildUrl( locale.name, resource );
      this.http.get( url, { responseType: 'arraybuffer' } )
        .toPromise()
        .then( translations => {
          resolve( translations );
        } )
        .catch( error => {

          if (locale.hasRegion) {
            this.messenger.info( `Using alternative: ${ locale.neutral }` );

            const url2 = buildUrl( locale.neutral, resource );
            this.http.get( url2, { responseType: 'arraybuffer' } )
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
