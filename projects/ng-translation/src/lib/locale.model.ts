export class Locale {

  name: string;
  neutral: string;
  hasRegion: boolean;

  constructor(
    language: string
  ) {
    const pos = language.indexOf( '-' );

    this.name = language;
    this.neutral = pos > 0 ? language.substr( 0, pos ) : language;
    this.hasRegion = pos > 0;
  }
}