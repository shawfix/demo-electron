import { electronAPI } from '@electron-toolkit/preload';

import { createBridge } from '../helper/bridge';

createBridge('electronAPI', electronAPI);
