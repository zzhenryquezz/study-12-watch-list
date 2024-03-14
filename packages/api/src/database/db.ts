import { drizzle } from 'drizzle-orm/better-sqlite3';
import { env } from '../env'
import { resolve } from 'path'

import Database from 'better-sqlite3';

const filename = resolve(process.cwd(), env.DB_FILENAME);

export const sqlite = new Database(filename);

export const db = drizzle(sqlite);


