import { join } from 'node:path';

export const mainWindowConfig = {
  preload: join(__dirname, '../preload/index.js'),
  loadFile: join(__dirname, '../renderer/index.html')
};
