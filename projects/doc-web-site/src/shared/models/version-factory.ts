import { Observable, of } from 'rxjs';

import { VERSION } from '../constants/VERSION';
import { Option } from './option';

export class VersionFactory {

  static create(): Observable<Array<Option>> {

    const versions: Array<Option> = new Array<Option>();
    versions.push( { value: VERSION.v3_5, text: 'Version 3.5' } );
    versions.push( { value: VERSION.v3_0, text: 'Version 3.0' } );
    versions.push( { value: VERSION.v2_0, text: 'Version 2.0' } );
    versions.push( { value: VERSION.v1_0, text: 'Version 1.0' } );
    return of( versions );
  }
}
