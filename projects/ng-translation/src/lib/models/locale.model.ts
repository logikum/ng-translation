/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */

export class Locale {

  readonly name: string;
  readonly neutral: string;
  readonly hasRegion: boolean;

  constructor(
    readonly baseName: string
  ) {

    // @ts-ignore
    const locale = new Intl.Locale( baseName );

    this.name = locale.baseName;
    this.neutral = locale.language;
    this.hasRegion = !!locale.region;
  }
}
