import { isLinux, isMac, isWindows } from '../../main/helper/platform';
import { createBridge } from '../helper/bridge';

createBridge('platform', {
  isLinux: isLinux,
  isMac: isMac,
  isWindows: isWindows
});
