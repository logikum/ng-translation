/* 3rd party libraries */
import { HttpClient } from '@angular/common/http';
import { MessengerService } from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import { ResourceLoader } from '../models';
import { LoaderBase } from './loader-base';

export class BlobLoader extends LoaderBase<object> implements ResourceLoader {

  constructor(
    protected readonly http: HttpClient,
    protected readonly messenger: MessengerService,
  ) {
    super( 'blob', http, messenger );
  }
}
