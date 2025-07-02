/* 3rd party libraries */
import { Component, ElementRef, effect, inject, input } from '@angular/core';
import { take } from 'rxjs';
import highlightJs from 'highlight.js';

/* locally accessible feature module code, always use a relative path */
import { MarkdownService } from './markdown.service';

@Component({
  selector: 'markdown-renderer',
  template: 'Loading document...',
  standalone: true,
})
export class MarkdownRendererComponent {

  private _elementRef = inject<ElementRef>(ElementRef);
  private markdownService = inject(MarkdownService);

  src = input.required<string>();
  // textContent = '';

  constructor() {
    effect(() => {
      const src = this.src();
      this.setDataFromSrc(src);
    });
  }

  private setDataFromSrc(
    src: string
  ): void {
    this.markdownService
      .htmlContent(src)
      .pipe(take(1))
      .subscribe((htmlContent) => {
        this.updateDocument(htmlContent as string);
      });
  }

  private updateDocument(
    rawHTML: string
  ): void {
    this._elementRef.nativeElement.innerHTML = rawHTML;
    // this.textContent = this._elementRef.nativeElement.textContent;
    highlightJs.highlightAll();
  }
}
