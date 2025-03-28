import path from 'path';
import Observer from './observer.mjs';

var observer = new Observer();

const folder = path.resolve(
  process.cwd(), 'projects/functional-test-site/src'
  );

observer
  .on('file-added', data => {
    console.log(data.filePath);
  })
  .on('file-changed', data => {
    console.log(data.filePath);
  })
  .on('file-removed', data => {
    console.log(data.filePath);
  });

observer.watchFolder(folder);
