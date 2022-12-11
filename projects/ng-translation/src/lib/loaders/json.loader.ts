/* 3rd party libraries */
import { HttpClient } from '@angular/common/http';

/* locally accessible feature module code, always use relative path */
import { ResourceLoader } from '../models';
import { MessengerService } from '../services';
import { LoaderBase } from './loader-base';

export class JsonLoader extends LoaderBase<object> implements ResourceLoader {

  constructor(
    protected readonly http: HttpClient,
    protected readonly messenger: MessengerService
  ) {
    super( { responseType: 'json' }, http, messenger );
  }
}
