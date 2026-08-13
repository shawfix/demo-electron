import { contextBridge } from 'electron';

export function createBridge(apiKey: string, api: Record<string, any> = {}) {
  api['__bridge_name__'] = apiKey;

  // Use `contextBridge` APIs to expose Electron APIs to
  // renderer only if context isolation is enabled, otherwise
  // just add to the DOM global.
  if (process.contextIsolated) {
    try {
      contextBridge.exposeInMainWorld(apiKey, api);
    } catch (error) {
      console.error(error);
    }
  } else {
    // @ts-ignore (define in dts)
    window[apiKey] = api;
  }
}
