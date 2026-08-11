import { join } from 'node:path';

import { app } from 'electron';

import DataBase from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

import * as schema from './schema';

// TODO: Add logger
export function initDB() {
  const sqlite3 = new DataBase(join(app.getPath('userData'), 'app.db'));
  // 提升并发读写性能
  sqlite3.pragma('journal_mode = WAL');

  const db = drizzle(sqlite3, { schema: schema });
  // 启动时自动执行未跑过的迁移（schema 变了用户无感升级）
  migrate(db, { migrationsFolder: join(app.getAppPath(), 'drizzle') });

  return db;
}
