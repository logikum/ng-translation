/* 3rd party libraries */
import { HttpClient } from '@angular/common/http';

/* locally accessible feature module code, always use a relative path */
import { ResourceLoader } from '../models';
import { LoaderBase } from './loader-base';
import { MessengerService } from '../services';

export class JsonLoader extends LoaderBase<object> implements ResourceLoader {

  constructor(
    protected readonly http: HttpClient,
    protected readonly messenger: MessengerService,
  ) {
    super( 'json', http, messenger );
  }
}
