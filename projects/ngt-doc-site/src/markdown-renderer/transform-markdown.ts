/* 3rd party libraries */
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

/* locally accessible feature module code, always use a relative path */
import { highlightCodeBlock } from './highlight-code-block';

marked.use(markedHighlight({ highlight: highlightCodeBlock }));

export const markdownToHtml = (content: string) => {
  return marked(content);
};
