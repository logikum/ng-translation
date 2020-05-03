import { Injectable } from '@angular/core';
import typings from '../assets/i18n/en/typings';

export function GenericClass<Props>(): new () => Props {
  return class { } as any;
}

function transformObjectToPath<T extends object | string>(
  suffix: string,
  objectToTransformOrEndOfPath: T,
  path = ''
): T {
  return typeof objectToTransformOrEndOfPath === 'object' ?
    Object.entries( objectToTransformOrEndOfPath ).reduce(
      (objectToTransform, [ key, value ]) => {
        objectToTransform[ key ] = transformObjectToPath(
          key,
          value,
          concatIfExistsPath( path, suffix )
        );
        return objectToTransform;
      },
      { } as T
    ) :
    concatIfExistsPath( path, suffix ) as T;
}

function concatIfExistsPath(
  path: string,
  suffix: string
): string {
  return path ? `${ path}.${ suffix }` : suffix;
}

@Injectable()
// @ts-ignore
export class TranslationsService extends GenericClass<typeof typings> {
  constructor() {
    super();
    Object.assign( this, transformObjectToPath( '', typings ) );
  }
}
