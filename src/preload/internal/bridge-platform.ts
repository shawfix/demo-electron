import { createBridge } from '../helper/bridge';

import { isLinux, isMac, isWindows } from '../../main/helper/platform';

createBridge('platform', {
  isLinux: isLinux,
  isMac: isMac,
  isWindows: isWindows
});
