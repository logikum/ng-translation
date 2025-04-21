/* 3rd party libraries */
import { HttpClient } from '@angular/common/http';

/* locally accessible feature module code, always use relative path */
import { ResourceLoader } from '../models';
import { LoaderBase } from './loader-base';
import { MessengerService } from '../services';

export class TextLoader extends LoaderBase<string> implements ResourceLoader {

  constructor(
    protected readonly http: HttpClient,
    protected readonly messenger: MessengerService,
  ) {
    super( 'text', http, messenger );
  }
}
