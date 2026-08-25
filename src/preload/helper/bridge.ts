import { contextBridge } from 'electron';

// 通用桥接工厂，需接收任意形状的 API 对象（如三方库导出的接口），无法收窄类型
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createBridge(apiKey: string, api: Record<string, any> = {}): void {
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
