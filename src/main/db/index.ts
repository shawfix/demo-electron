import { join } from 'node:path';

import { app } from 'electron';

import DataBase from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

import * as schema from './schema';
import { test } from './schema';
import { DBLogger } from '../logger/db-logger';

// TODO: Add logger
export function initDB() {
  try {
    const sqlite3 = new DataBase(join(app.getPath('userData'), 'app.db'));
    // 提升并发读写性能
    sqlite3.pragma('journal_mode = WAL');

    const db = drizzle(sqlite3, { schema: schema });
    // 启动时自动执行未跑过的迁移（schema 变了用户无感升级）
    migrate(db, { migrationsFolder: join(app.getAppPath(), 'drizzle') });

    DBLogger.info('%cDatabase initialized successfully', 'color: green');
    return db;
  } catch (error) {
    DBLogger.error('%cError occurred while initializing the database', 'color: red');
    DBLogger.error(error);
  }
}

export function testDB(db: ReturnType<typeof initDB>) {
  try {
    const inserted = db!.insert(test).values({}).returning().get();
    DBLogger.info('Inserted row: %o', inserted);
    DBLogger.info('%cDatabase tested successfully', 'color: green');
  } catch (error) {
    DBLogger.error('%cInitial database occurs error', 'color: red');
    DBLogger.error(error);
  }
}
