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
  src = input.required<string>();
  textContent = '';

  private _elementRef = inject<ElementRef>(ElementRef);

  private markdownService = inject(MarkdownService);

  constructor() {
    effect(() => {
      const src = this.src();
      this.setDataFromSrc(src);
    });
  }

  setDataFromSrc(src: string) {
    this.markdownService
      .htmlContent(src)
      .pipe(take(1))
      .subscribe((htmlContent) => {
        this.updateDocument(htmlContent as string);
      });
  }

  updateDocument(rawHTML: string) {
    this._elementRef.nativeElement.innerHTML = rawHTML;
    this.textContent = this._elementRef.nativeElement.textContent;
    highlightJs.highlightAll();
  }
}
