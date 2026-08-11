import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    api: unknown;
    electronAPI: ElectronAPI;
    platform: {
      isLinux: boolean;
      isMac: boolean;
      isWindows: boolean;
    };
  }
}
