import type { Config } from 'drizzle-kit';
import { env } from '../env';

export default {
    strict: true,
    verbose: true,
    schema: './src/database/schema.ts',
    out: './src/database/migrations',
    driver: 'better-sqlite',
    dbCredentials: {
        url: env.DB_FILENAME
    }
} satisfies Config;
