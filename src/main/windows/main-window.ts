import { is } from '@electron-toolkit/utils';
import { BrowserWindow, shell } from 'electron';

import { MAC_TRAFFIC_LIGHT_EXPANDED_POSITION } from './internal/constant';

import { isMac, isWindows } from '../helper/platform';
import { mainWindowConfig } from './internal/config';

let mainWindowPtr: BrowserWindow | null = null;

// TODO: Add logger
export function createMainWindow(): BrowserWindow {
  // Config
  const { preload, loadURL, loadFile } = mainWindowConfig;

  // Options
  const autoHideMenuBar = !isWindows; // Windows 平台下不自动隐藏菜单栏，避免用户误操作
  const titleBarStyle = isMac ? 'hiddenInset' : 'default';
  const trafficLightPosition = isMac ? MAC_TRAFFIC_LIGHT_EXPANDED_POSITION : undefined;

  // Options.webPreferences
  const scrollBounce = isMac ? true : false;

  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: autoHideMenuBar,
    backgroundColor: '#ffffff',
    titleBarStyle: titleBarStyle,
    trafficLightPosition: trafficLightPosition,
    webPreferences: {
      preload: preload,
      contextIsolation: true,
      nodeIntegration: false,
      plugins: true,
      sandbox: false,
      scrollBounce: scrollBounce,
      webviewTag: false
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && loadURL) {
    mainWindow.loadURL(loadURL);
  } else {
    mainWindow.loadFile(loadFile);
  }

  mainWindowPtr = mainWindow;
  return mainWindow;
}
