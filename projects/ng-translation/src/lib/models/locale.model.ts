/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */

export class Locale {

  readonly name: string;
  readonly neutral: string;
  readonly hasRegion: boolean;

  constructor(
    readonly language: string
  ) {
    const pos = language.indexOf( '-' );

    this.name = language;
    this.neutral = pos > 0 ? language.substr( 0, pos ) : language;
    this.hasRegion = pos > 0;
  }
}
