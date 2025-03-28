import chokidar from 'chokidar';
import EventEmitter from 'node:events';
import fsExtra from 'fs-extra';

export default class Observer extends EventEmitter {
  constructor() {
    super();
  }

  watchFolder(folder) {
    try {
      const relFolder = folder.substring(process.cwd().length + 1);
      console.log(
        `[${new Date().toLocaleString()}] Watching for folder changes on: ${relFolder}`
      );

      const watcher = chokidar.watch(folder, {
        ignored: (path, stats) => stats?.isFile() && !path.endsWith('.text'),
        persistent: true
      });

      watcher
        .on('add', async filePath => {
          const relFilePath = filePath.substring(folder.length + 1);
          this.log(relFilePath, 'added');
          this.emit('file-added', { filePath: relFilePath });
        })
        .on('change', async filePath => {
          const relFilePath = filePath.substring(folder.length + 1);
          this.log(filePath, 'changed');
          this.emit('file-changed', { filePath: relFilePath });
        })
        .on('unlink', async filePath => {
          const relFilePath = filePath.substring(folder.length + 1);
          this.log(filePath, 'removed');
          this.emit('file-removed', { filePath: relFilePath });
        });
    } catch (error) {
      console.log(error);
    }
  }

  log(filePath, event) {
    console.log(`${filePath} has been ${event}.`);
  }
}
