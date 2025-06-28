/* 3rd party libraries */
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/* locally accessible feature module code, always use a relative path */
import { MarkdownRendererComponent } from '../markdown-renderer/markdown-renderer';

@Component({
  selector: 'doc-root',
  imports: [
    RouterOutlet,
    MarkdownRendererComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngt-doc-site';
}
