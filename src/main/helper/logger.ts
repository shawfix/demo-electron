import { join } from 'node:path';

import { app } from 'electron/main';
import log from 'electron-log/main';

const fileLevel = import.meta.env['VITE_LOG_FILE_LEVEL'];
const fileMaxSize = import.meta.env['VITE_LOG_FILE_MAX_SIZE'];
const consoleLevel = import.meta.env['VITE_LOG_CONSOLE_LEVEL'];

export function createLogger(options: { logId: string; scope: string }): typeof log {
  const path = join(
    app.getPath('userData'),
    'logs',
    `${options.scope ?? options.logId ?? 'default'}.log`
  );

  const logger = log.create({ logId: options.logId });

  logger.scope.defaultLabel = options.scope;
  logger.scope.labelPadding = 8;

  logger.transports.file.level = fileLevel ?? 'info';
  logger.transports.file.maxSize = (fileMaxSize ?? 'info') * 1024 * 1024;
  logger.transports.file.resolvePathFn = (_) => path;

  logger.transports.console.format = `[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {scope} {text}`;
  logger.transports.console.level = consoleLevel ?? 'info';

  logger.info(`%cLogger initialized successfully`, 'color: green');
  logger.info(`logId:\t${options.logId}`);
  logger.info(`scope:\t${options.scope}`);
  logger.info(`path:\t${path}`);

  return logger;
}
