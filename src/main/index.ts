import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { app, BrowserWindow, ipcMain } from 'electron';

import { initDB, testDB } from './db';
import { MainLogger } from './logger/main-logger';
import { createMainWindow } from './windows/main-window';

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app
  .whenReady()
  .then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron');

    const db = initDB();

    // IPC test
    ipcMain.on('ping', () => MainLogger.info('%cIPC connection test', 'color: blue'));

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window);
    });

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });

    createMainWindow();

    if (is.dev) {
      runTest(db);
    }

    MainLogger.info('%cApp started successfully', 'color: green');
  })
  .catch((error) => {
    MainLogger.error('%cError occurred while running the app', 'color: red');
    MainLogger.error(error);
  });

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    MainLogger.warn('%cQuit when all windows are closed', 'color: yellow');

    app.quit();
  }
});

/**
 * 测试
 * @param db
 */
function runTest(db: ReturnType<typeof initDB>): void {
  testDB(db);
}
