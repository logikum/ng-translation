import path from 'path';
import { setTimeout } from 'node:timers';
import Observer from './observer.mjs';
import { updateI18n } from './update-i18n.mjs';

if (process.argv.length < 4) {
  console.log('Usage: node server sourcePath targetPath [interfacePath]');
  process.exit(1);
}
const sourcePath = path.resolve( process.cwd(), process.argv[2] );
const targetPath = path.resolve( process.cwd(), process.argv[3] );
const interfacePath = process.argv[4]
  ? path.resolve( process.cwd(), process.argv[4] ) : '';

const observer = new Observer();

observer
  .on('file-added', data => {
    startUpdate();
  })
  .on('file-changed', data => {
    startUpdate();
  })
  .on('file-removed', data => {
    startUpdate();
  });

observer.watchFolder(sourcePath);

let filesChanged = 0;
let updateInProgress = false;
let isInitialized = false;

function startUpdate() {

  if (!updateInProgress) {

    updateInProgress = true;
    setTimeout(() => {
      filesChanged = 0;
      updateI18n(sourcePath, targetPath, interfacePath);
      updateInProgress = false;
      if (filesChanged > 0) {
        startUpdate();
      } else if (!isInitialized) {
        isInitialized = true;
        observer.isInitialized = true;
      }
    }, 500);

  } else {
    filesChanged++;
  }
}
